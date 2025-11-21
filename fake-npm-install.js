#!/usr/bin/env node

const readline = require("readline");
const crypto = require("crypto");

// ==============================
// npm-like ANSI color helpers
// ==============================
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m"
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

function randomDep() {
  const libs = [
    "react", "express", "chalk", "lodash", "mongoose",
    "cors", "dotenv", "yargs", "axios", "typescript",
    "vite", "webpack", "jsonwebtoken", "bcrypt"
  ];
  return libs[Math.floor(Math.random() * libs.length)];
}

function randomVersion() {
  return `${Math.floor(Math.random()*9)+1}.${Math.floor(Math.random()*9)}.${Math.floor(Math.random()*9)}`;
}

async function progressBar(label) {
  const total = 25;
  for (let i = 0; i <= total; i++) {
    const bar = "=".repeat(i) + " ".repeat(total - i);
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(
      c.gray + label + c.reset + " [" + bar + "] " + Math.floor((i/total)*100) + "%"
    );
    await sleep(40 + Math.random()*60);
  }
  console.log();
}

async function fakeNPM() {

  console.log(c.cyan + "┌───────────────────────────────────────────────┐");
  console.log("│         Fake npm Installer (simulation)       │");
  console.log("└───────────────────────────────────────────────┘" + c.reset);
  console.log();

  // sudo prompt
  process.stdout.write(c.bold + "[sudo] password for user: " + c.reset);
  await sleep(1200);
  console.log("******");
  await spinner("Authenticating");

  console.log();
  console.log(c.yellow + "npm WARN old lockfile" + c.reset);
  console.log(
    c.yellow +
    "npm WARN old lockfile" +
    c.reset +
    " The package-lock.json file was created with an old version of npm\n"
  );

  await spinner("Retrieving package metadata");
  await spinner("Fetching dependency graph");
  
  // fake deprecation warnings
  const depWarns = [
    "uuid@2.0.1: Please upgrade to version 8.x or higher.",
    "request@2.88.2: request has been deprecated.",
    "left-pad@1.3.0: Use String.prototype.padStart() instead."
  ];

  console.log(
    c.yellow + "npm WARN deprecated " + c.reset +
    depWarns[Math.floor(Math.random() * depWarns.length)] +
    "\n"
  );

  const deps = Array.from({length: 6}, () => ({
    name: randomDep(),
    version: randomVersion()
  }));

  for (const d of deps) {
    await progressBar(`Downloading ${d.name}@${d.version}`);
    await progressBar(`Extracting ${d.name}@${d.version}`);

    console.log(
      c.green +
      `added ${Math.floor(Math.random()*5)+1} packages` +
      c.reset +
      ` from ${c.cyan}${crypto.randomBytes(3).toString("hex")}${c.reset} ` +
      `in ${(Math.random()*2+0.5).toFixed(2)}s\n`
    );
    await sleep(300);
  }

  console.log(c.cyan + "Resolving dependencies..." + c.reset);
  await sleep(800);

  console.log(c.cyan + "Generating optimized production build..." + c.reset);
  await sleep(1200);

  console.log(
    "\n" + c.green + "added 42 packages" + c.reset + 
    ", and audited 42 packages in 3.2s"
  );
  console.log();

  // vulnerabilities
  console.log(c.red + "5 vulnerabilities" + c.reset + " (" +
    c.yellow + "2 low" + c.reset + ", " +
    c.yellow + "1 moderate" + c.reset + ", " +
    c.red + "2 high" + c.reset + ")"
  );

  console.log(
    c.cyan + "To address issues, run: " + c.reset + "npm audit fix"
  );
  console.log(
    c.cyan + "To address all issues (including breaking changes), run: " + 
    c.reset + "npm audit fix --force\n"
  );

  console.log(c.green + "✔ Installation complete" + c.reset);
  console.log(c.gray + "✔ No files were changed on your system (simulation)\n" + c.reset);

  console.log(c.cyan + "Thank you for using the Fake npm Installer!" + c.reset);
}

fakeNPM();
