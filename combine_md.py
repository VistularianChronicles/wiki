import os
import sys

def adjust_headers(content):
    lines = content.splitlines()
    adjusted = []
    for line in lines:
        if line.strip().startswith("#"):
            adjusted.append("#" + line)
        else:
            adjusted.append(line)
    return "\n".join(adjusted)

def process_markdown_file(filepath, header_title):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    adjusted_content = adjust_headers(content)
    return f"# {header_title}\n\n{adjusted_content}\n"

def get_markdown_files(base_path):
    result = []

    # First add top-level files (not in subfolders)
    top_files = sorted([
        f for f in os.listdir(base_path)
        if os.path.isfile(os.path.join(base_path, f)) and f.endswith(".md")
    ])
    for f in top_files:
        full_path = os.path.join(base_path, f)
        header_title = f
        result.append((full_path, header_title))

    # Then go through each subfolder
    subfolders = sorted([
        d for d in os.listdir(base_path)
        if os.path.isdir(os.path.join(base_path, d))
    ])
    for folder in subfolders:
        folder_path = os.path.join(base_path, folder)
        for root, _, files in os.walk(folder_path):
            rel_root = os.path.relpath(root, base_path)
            for f in sorted(files):
                if f.endswith(".md"):
                    full_path = os.path.join(root, f)
                    rel_path = os.path.join(rel_root, f)
                    result.append((full_path, rel_path))
    return result

def main(folder_path):
    all_files = get_markdown_files(folder_path)
    combined = []

    for path, display_name in all_files:
        combined.append(process_markdown_file(path, display_name))

    output_path = os.path.join(folder_path, "combined_output.md")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(combined))
    
    print(f"✅ Combined markdown written to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python combine_md.py /path/to/folder")
        sys.exit(1)
    main_folder = sys.argv[1]
    main(main_folder)
