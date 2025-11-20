import time
import random
import sys

packages = [
    "core-utils", "network-stack", "hyperdrive-engine", "quantum-cache",
    "ui-framework", "security-suite", "driver-pack", "AI-helper"
]

def progress_bar(progress, total, length=40):
    filled = int(length * progress // total)
    bar = "█" * filled + "-" * (length - filled)
    return f"[{bar}] {int(progress / total * 100)}%"

print("Initializing installer...\n")
time.sleep(1)

for pkg in packages:
    print(f"Installing {pkg}...")
    total = random.randint(20, 60)
    for i in range(total):
        time.sleep(random.uniform(0.02, 0.08))
        sys.stdout.write("\r" + progress_bar(i + 1, total))
        sys.stdout.flush()
    print("\n✓ Completed\n")
    time.sleep(0.5)

print("Finalizing...")
for i in range(30):
    time.sleep(0.05)
    sys.stdout.write("\r" + progress_bar(i + 1, 30))
    sys.stdout.flush()

print("\n\nAll packages installed successfully! (not really 😄)")
