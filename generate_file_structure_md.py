import os

# Customize ignore lists here
IGNORE_FOLDERS = {'.git', '__pycache__', 'node_modules', 'docs'}
IGNORE_FILES = {'Thumbs.db', '.DS_Store'}

def generate_structure(path, indent=0):
    entries = []
    try:
        items = sorted(os.listdir(path))
    except PermissionError:
        return []

    for item in items:
        full_path = os.path.join(path, item)

        if os.path.isdir(full_path):
            if item in IGNORE_FOLDERS:
                continue
            entries.append("  " * indent + f"- **{item}/**")
            entries.extend(generate_structure(full_path, indent + 1))
        elif os.path.isfile(full_path):
            if item in IGNORE_FILES:
                continue
            entries.append("  " * indent + f"- {item}")
    return entries

def main():
    root_path = os.getcwd()
    structure = generate_structure(root_path)
    output = "# Project File Structure\n\n" + "\n".join(structure)

    with open("file_structure.md", "w", encoding="utf-8") as f:
        f.write(output)

    print("✅ File structure written to: file_structure.md")

if __name__ == "__main__":
    main()
