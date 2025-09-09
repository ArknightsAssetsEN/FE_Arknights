import os
import json

def dir_to_dict(path):
    tree = {}
    for root, dirs, files in os.walk(path):
        rel_path = os.path.relpath(root, path)
        if rel_path == ".":
            rel_path = ""
        node = tree
        if rel_path:
            for part in rel_path.split(os.sep):
                node = node.setdefault(part, {})
        for f in files:
            node.setdefault("files", []).append(f)
    return tree

tree = dir_to_dict("data")

# Ghi ra file JSON
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(tree, f, ensure_ascii=False, indent=2)

print("✅ Đã xuất ra tree.json")
