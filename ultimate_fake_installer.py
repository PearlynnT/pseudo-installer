import time
import random
import sys
import itertools
import getpass

# ============================================
# ASCII animations and spinner utilities
# ============================================

spinner = itertools.cycle(["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"])
def spinning(msg, duration=2):
    start = time.time()
    while time.time() - start < duration:
        sys.stdout.write(f"\r{next(spinner)} {msg}")
        sys.stdout.flush()
        time.sleep(0.08)
    sys.stdout.write("\r✓ " + msg + " " * 20 + "\n")

def progress_bar(label, steps=30):
    for i in range(steps + 1):
        bar = "█" * i + "-" * (steps - i)
        sys.stdout.write(f"\r{label}: [{bar}] {int((i/steps)*100)}%")
        sys.stdout.flush()
        time.sleep(0.05 + random.uniform(0, 0.03))
    print()

# ============================================
# Fake installer logic
# ============================================

packages = [
    "hyper-core", "neural-kernel", "visual-engine", "cache-wizard",
    "driver-pack", "AI-optimizer", "quantum-sync"
]

funny_logs = [
    "Allocating imaginary memory blocks...",
    "Calibrating flux capacitors...",
    "Teaching AI to feel emotions...",
    "Downloading more RAM...",
    "Enabling 5D rendering pipeline...",
    "Reticulating splines...",
    "Patching kernel with duct tape..."
]

fake_errors = [
    "Warning: System detected too much awesomeness.",
    "Error: Something went wrong, but we fixed it before you noticed.",
    "Fatal Error: The installer has encountered a fatal... nah just kidding.",
    "Warning: Low patience detected."
]

# ============================================
# Main Program
# ============================================

def main():
    print(r"""
   ____       _        _____           _        _ _
  |  _ \ __ _(_)_ __  |  ___|__  _ __ | |_ __ _| | |
  | |_) / _` | | '_ \ | |_ / _ \| '_ \| __/ _` | | |
  |  __/ (_| | | | | ||  _| (_) | | | | || (_| | | |
  |_|   \__,_|_|_| |_|_|  \___/|_| |_|\__\__,_|_|_|

        ★ Ultimate Fake Installer ★
    """)

    # Fake sudo prompt
    print("This action requires administrative privileges.")
    pw = getpass.getpass("Password for sudo: ")
    spinning("Validating password")
    print("Access granted.\n")

    # User choice menu
    print("Select what you want to 'install':")
    choices = [
        "1) Full System Package",
        "2) Minimal Runtime",
        "3) AI Enhancement Modules",
        "4) Developer Tools",
        "5) Everything!!!"
    ]
    for c in choices:
        print(c)

    choice = input("\nEnter choice number: ").strip()
    spinning("Processing selection")

    # Begin installation simulation
    print("\nStarting installation...\n")
    for pkg in packages:
        spinning(f"Preparing package '{pkg}'")

        # Random funny logs
        for _ in range(random.randint(1, 3)):
            log = random.choice(funny_logs)
            spinning(log, duration=1.2)

        # Fake error (sometimes)
        if random.random() < 0.25:
            err = random.choice(fake_errors)
            print("⚠ " + err)
            time.sleep(1)

        progress_bar(f"Installing {pkg}")

        print(f"✓ Finished {pkg}\n")
        time.sleep(0.3)

    spinning("Cleaning up temp files")
    spinning("Optimizing imaginary system performance")
    spinning("Finalizing installation")

    print("\n✔ All selected packages were installed successfully!")
    print("✔ No changes were made to your system 😄")
    print("✔ Thanks for using Ultimate Fake Installer™")

if __name__ == "__main__":
    main()
