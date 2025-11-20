#!/usr/bin/env node

const readline = require("readline");
const crypto = require("crypto");

// ANSI colors for npm-like appearance
const c = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m"
};

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function spinner(text, duration = 1500) {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
  let i = 0;
  const start = Date.now();

  while (Date.now() - start < duration) {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(c.cyan + frames[i] + c.reset + " " + text);
    i = (i + 1) % frames.length;
    await sleep(80);
  }

  readline.cursorTo(process.stdout, 0);
  console.log(c.green + "✓" + c.reset + " " + text);
}

async function progressBar(label, failChance = 0) {
  const total = 20;
  for (let i = 0; i <= total; i++) {
    const bar = "=".repeat(i) + " ".repeat(total - i);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(`${label} [${bar}] ${Math.floor((i/total)*100)}%`);
    await sleep(40 + Math.random()*60);

    if (failChance > 0 && Math.random() < failChance) throw new Error("NETWORK_FAIL");
  }
  console.log();
}

function randomDep() {
  const libs = [
    "sharp", "bcrypt", "react", "axios", "canvas",
    "sqlite3", "node-sass", "argon2", "esbuild"
  ];
  return libs[Math.floor(Math.random() * libs.length)];
}

function randomVersion() {
  return `${Math.floor(Math.random()*9)}.${Math.floor(Math.random()*9)}.${Math.floor(Math.random()*9)}`;
}

async function simulateNetworkFetch(dep, version) {
  let attempts = 0;
  while (attempts < 3) {
    try {
      await progressBar(`Downloading ${dep}@${version}`, 0.08);
      return; // No error → success
    } catch (e) {
      attempts++;
      console.log(
        c.red +
        `npm ERR! network request to https://registry.npmjs.org/${dep} failed, reason: connect EAI_AGAIN registry.npmjs.org` +
        c.reset
      );
      console.log(`npm WARN retry Will retry in ${attempts}0ms...\n`);
      await sleep(attempts * 600);
    }
  }

  console.log(c.red + `npm ERR! code EAI_AGAIN` + c.reset);
  console.log(c.red + `npm ERR! network Unable to connect to registry.npmjs.org` + c.reset);
  console.log(c.red + `npm ERR! A complete log of this run can be found in: ~/.npm/_logs/...` + c.reset);
  process.exit(1);
}

async function simulateNodeGyp(dep) {
  console.log(`${c.cyan}> ${dep}@${randomVersion()} install${c.reset}`);
  console.log(`${c.cyan}> node-gyp rebuild${c.reset}`);

  await sleep(500);
  console.log("gyp info it worked if it ends with ok");
  await sleep(300);
  console.log(`gyp info using node-gyp@${(Math.random()*6).toFixed(1)}`);
  console.log(`gyp info using node@${process.version}`);
  await sleep(500);

  console.log("gyp info configure");
  await sleep(300);
  console.log("gyp info compile");
  await sleep(600);

  console.log(c.green + "gyp info ok" + c.reset + "\n");
}

async function simulatePostInstall(dep) {
  console.log(`${c.cyan}> ${dep}@${randomVersion()} postinstall ${c.reset}`);
  await spinner("Running postinstall script");
}

async function fakeNPM() {

  // sudo prompt
  process.stdout.write(c.bold + "[sudo] password for user: " + c.reset);
  await sleep(1200);
  console.log("******");
  await spinner("Authenticating");

  console.log("\n" + c.yellow + "npm WARN old lockfile" + c.reset);
  console.log("npm WARN old lockfile The package-lock.json was created with an old version of npm\n");

  await spinner("Retrieving package metadata");
  await spinner("Resolving dependencies");

  const deps = Array.from({length: 5}, () => ({
    name: randomDep(),
    version: randomVersion()
  }));

  for (const d of deps) {
    console.log();
    await simulateNetworkFetch(d.name, d.version);

    await progressBar(`Extracting ${d.name}@${d.version}`);
    console.log(
      `added ${Math.floor(Math.random()*5)+1} packages from ${crypto.randomBytes(3).toString("hex")} in ${(Math.random()*3+0.6).toFixed(2)}s`
    );
    console.log();

    // If it's a native module, "compile" it
    if (["bcrypt", "canvas", "sqlite3", "argon2", "sharp", "node-sass"].includes(d.name)) {
      await simulateNodeGyp(d.name);
      await simulatePostInstall(d.name);
    }
  }

  console.log("\nadded 127 packages, and audited 127 packages in 4.6s\n");

  console.log("7 vulnerabilities (2 low, 3 moderate, 2 high)");
  console.log("To address issues, run: npm audit fix");
  console.log("To address all issues (including breaking changes), run: npm audit fix --force\n");

  console.log(c.green + "✔ Installation complete" + c.reset);
  console.log(c.cyan + "✔ (No actual changes were made; simulation only)" + c.reset);
  console.log();
}

fakeNPM();
