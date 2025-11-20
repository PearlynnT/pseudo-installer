#!/usr/bin/env node

const readline = require("readline");
const crypto = require("crypto");

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function spinner(text, duration = 1500) {
  const frames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
  let i = 0;
  const start = Date.now();

  while (Date.now() - start < duration) {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(frames[i] + " " + text);
    i = (i + 1) % frames.length;
    await sleep(80);
  }

  readline.cursorTo(process.stdout, 0);
  console.log("✓ " + text);
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
    process.stdout.write(`${label} [${bar}] ${Math.floor((i/total)*100)}%`);
    await sleep(40 + Math.random()*60);
  }
  console.log();
}

async function fakeNPM() {

  console.log("┌───────────────────────────────────────────────┐");
  console.log("│         Fake npm Installer (simulation)       │");
  console.log("└───────────────────────────────────────────────┘");
  console.log();

  // sudo prompt
  process.stdout.write("[sudo] password for user: ");
  await sleep(1200); // simulate typing delay
  console.log("******");
  await spinner("Authenticating");

  console.log("\nnpm WARN old lockfile");
  console.log("npm WARN old lockfile The package-lock.json file was created with an old version of npm\n");

  await spinner("Retrieving package metadata");
  await spinner("Fetching dependency graph");
  
  // fake deprecation warnings
  const depWarns = [
    "npm WARN deprecated uuid@2.0.1: Please upgrade to version 8.x or higher.",
    "npm WARN deprecated request@2.88.2: request has been deprecated.",
    "npm WARN deprecated left-pad@1.3.0: Use String.prototype.padStart() instead."
  ];
  console.log(depWarns[Math.floor(Math.random() * depWarns.length)] + "\n");

  // simulate downloads
  const deps = Array.from({length: 6}, () => ({
    name: randomDep(),
    version: randomVersion()
  }));

  for (const d of deps) {
    await progressBar(`Downloading ${d.name}@${d.version}`);
    await progressBar(`Extracting ${d.name}@${d.version}`);
    console.log(`added ${Math.floor(Math.random()*5)+1} packages from ${crypto.randomBytes(3).toString("hex")} in ${(Math.random()*2+0.5).toFixed(2)}s\n`);
    await sleep(300);
  }

  console.log("Resolving dependencies...");
  await sleep(800);

  console.log("Generating optimized production build...");
  await sleep(1200);

  // Fake dependency tree
  console.log("\nadded 42 packages, and audited 42 packages in 3.2s");
  console.log();

  // Fake vulnerabilities
  console.log("5 vulnerabilities (2 low, 1 moderate, 2 high)");
  console.log("To address issues, run: npm audit fix");
  console.log("To address all issues (including breaking changes), run: npm audit fix --force\n");

  console.log("✔ Installation complete");
  console.log("✔ No files were changed on your system (simulation)\n");

  console.log("Thank you for using the Fake npm Installer!");
}

fakeNPM();
