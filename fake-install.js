const packages = ["renderer", "cli-tools", "crypto-mod", "db-driver"];

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function run() {
  console.log("Starting installation...\n");

  for (const pkg of packages) {
    console.log(`Installing ${pkg}...`);
    for (let i = 0; i <= 100; i += 5) {
      process.stdout.write(`\r${i}%`);
      await sleep(40);
    }
    process.stdout.write("\n✓ Completed\n\n");
  }

  console.log("All done! (No files were modified.)");
}

run();
