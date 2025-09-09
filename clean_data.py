import os
import shutil
import re
from PIL import Image
import subprocess
import sys

def merge_image_alpha(base_path, filename):
    """Ghép file màu + alpha thành ảnh PNG nền trong suốt."""
    try:
        color_file = os.path.join(base_path, filename + ".png")
        alpha_file = os.path.join(base_path, filename + "[alpha].png")
        output_file = os.path.join(base_path, filename + ".png")

        if not (os.path.exists(color_file) and os.path.exists(alpha_file)):
            return  # bỏ qua nếu thiếu file

        color = Image.open(color_file).convert("RGB")
        alpha = Image.open(alpha_file).convert("L")
        color.putalpha(alpha)
        color.save(output_file, "PNG")
        print(f"[battle] Đã merge: {output_file}")
    except Exception as e:
        print(f"[battle] Lỗi khi merge {filename}: {e}")

def is_invalid_file(filename, expected_name):
    base, ext = os.path.splitext(filename)
    # if base != expected_name and base != expected_name + "[alpha]" or '#' in ext:
    # if expected_name not in base or '#' in ext:
    if '#' in ext:
        return True
    return False

def move_source_to_data():
    # src = os.path.join('assets', 'assets', 'torappu', 'dynamicassets')
    src = os.path.join('assets', 'dyn')
    data = 'data'

    if not os.path.exists(src):
        print(f"Không tìm thấy thư mục nguồn: {src}")
        return
    if os.path.exists(data):
        shutil.rmtree(data)
    shutil.move(src, data)
    print(f"Đã di chuyển {src} → {data}")


def remove_other_dirs(except_dir='data'):
    base_dir = os.path.dirname(os.path.abspath(__file__))
    for name in os.listdir(base_dir):
        path = os.path.join(base_dir, name)
        if os.path.isdir(path) and name == 'assets':
            try:
                shutil.rmtree(path)
                print(f"Đã xóa thư mục: {path}")
            except Exception as e:
                print(f"Lỗi khi xóa {path}: {e}")


def clean_data_arts():
    charavatars_dir = os.path.join('data', 'arts', 'charavatars')
    if os.path.exists(charavatars_dir):
        try:
            shutil.rmtree(charavatars_dir)
            print(f"Đã xóa thư mục: {charavatars_dir}")
        except Exception as e:
            print(f"Lỗi khi xóa {charavatars_dir}: {e}")
    
    maps_dir = os.path.join('data', 'arts', 'maps')
    if os.path.exists(maps_dir):
        try:
            shutil.rmtree(maps_dir)
            print(f"Đã xóa thư mục: {maps_dir}")
        except Exception as e:
            print(f"Lỗi khi xóa {maps_dir}: {e}")

    ui_dir = os.path.join('data', 'ui')
    if os.path.exists(ui_dir):
        try:
            shutil.rmtree(ui_dir)
            print(f"Đã xóa thư mục: {ui_dir}")
        except Exception as e:
            print(f"Lỗi khi xóa {ui_dir}: {e}")
    
    arts_characters_dir = os.path.join('data', 'arts', 'characters')
    arts_enemies_dir = os.path.join('data', 'arts', 'enemies')

    if os.path.exists(arts_characters_dir):
        for name in os.listdir(arts_characters_dir):
            dir = os.path.join(arts_characters_dir, name)
            if not os.path.isdir(dir):
                continue
            else:
                commit_push(dir, f"🔄 Auto update arts characters assets: {name}")

    if os.path.exists(arts_enemies_dir):
        for name in os.listdir(arts_enemies_dir):
            dir = os.path.join(arts_enemies_dir, name)
            if not os.path.isdir(dir):
                continue
            else:
                commit_push(dir, f"🔄 Auto update arts enemies assets: {name}")



def clean_battle_subdirs():
    effects_dir = os.path.join('data', 'battle', 'prefabs', 'effects')
    if os.path.exists(effects_dir):
        try:
            shutil.rmtree(effects_dir)
            print(f"Đã xóa thư mục: {effects_dir}")
        except Exception as e:
            print(f"Lỗi khi xóa {effects_dir}: {e}")

    character_dir = os.path.join('data', 'battle', 'prefabs', 'skins', 'character')
    enemy_dir = os.path.join('data', 'battle', 'prefabs', 'enemies')
    battle_character_dir = os.path.join('data', 'battle', 'character')
    battle_enemies_dir = os.path.join('data', 'battle', 'enemies')
    prefabs_dir = os.path.join('data', 'battle', 'prefabs')

    if not os.path.exists(character_dir):
        print(f"Không tìm thấy thư mục character trong battle: {character_dir}")
        return

    # Di chuyển các thư mục con từ character về battle/
    for name in os.listdir(character_dir):
        src_path = os.path.join(character_dir, name)
        dest_path = os.path.join(battle_character_dir, name)
        if os.path.isdir(src_path):
            try:
                shutil.move(src_path, dest_path)
                print(f"[battle] Đã di chuyển: {src_path} → {dest_path}")
            except Exception as e:
                print(f"[battle] Lỗi khi di chuyển {src_path}: {e}")

    # Di chuyển các thư mục con từ enemy_dir về battle/
    for name in os.listdir(enemy_dir):
        src_path = os.path.join(enemy_dir, name)
        dest_path = os.path.join(battle_enemies_dir, name)
        if os.path.isdir(src_path):
            try:
                shutil.move(src_path, dest_path)
                print(f"[battle] Đã di chuyển: {src_path} → {dest_path}")
            except Exception as e:
                print(f"[battle] Lỗi khi di chuyển {src_path}: {e}")

    # Xóa thư mục prefabs/
    if os.path.exists(prefabs_dir):
        try:
            shutil.rmtree(prefabs_dir)
            print(f"[battle] Đã xóa thư mục: {prefabs_dir}")
        except Exception as e:
            print(f"[battle] Lỗi khi xóa {prefabs_dir}: {e}")


def clean_building_subdirs():
    character_dir = os.path.join('data', 'building', 'vault', 'characters')
    building_dir = os.path.join('data', 'building')
    vault_dir = os.path.join('data', 'building', 'vault')

    if not os.path.exists(character_dir):
        print(f"Không tìm thấy thư mục character trong building: {character_dir}")
        return

    # Di chuyển các thư mục con từ character về building/
    for name in os.listdir(character_dir):
        src_path = os.path.join(character_dir, name)
        dest_path = os.path.join(building_dir, name)
        if os.path.isdir(src_path):
            try:
                shutil.move(src_path, dest_path)
                print(f"[building] Đã di chuyển: {src_path} → {dest_path}")
            except Exception as e:
                print(f"[building] Lỗi khi di chuyển {src_path}: {e}")

    # Xóa thư mục vault/
    if os.path.exists(vault_dir):
        try:
            shutil.rmtree(vault_dir)
            print(f"[building] Đã xóa thư mục: {vault_dir}")
        except Exception as e:
            print(f"[building] Lỗi khi xóa {vault_dir}: {e}")

# ============

def clean_battle_files():
    dir_name = ['enemies', 'character']
    for dn in dir_name:
        battle_dir = os.path.join('data', 'battle', dn)
        if not os.path.exists(battle_dir):
            print("Không tìm thấy thư mục battle.")
            return

        for name in os.listdir(battle_dir):
            char_dir = os.path.join(battle_dir, name)
            if not os.path.isdir(char_dir):
                continue

            defaultskin_dir = os.path.join(char_dir, 'defaultskin')

            # Di chuyển file từ defaultskin về thư mục cha
            if os.path.isdir(defaultskin_dir):
                for file_name in os.listdir(defaultskin_dir):
                    src_file = os.path.join(defaultskin_dir, file_name)
                    dest_file = os.path.join(char_dir, file_name)
                    try:
                        shutil.move(src_file, dest_file)
                        print(f"[battle] Di chuyển file: {src_file} → {dest_file}")
                    except Exception as e:
                        print(f"[battle] Lỗi khi di chuyển file {src_file}: {e}")
                try:
                    shutil.rmtree(defaultskin_dir)
                    print(f"[battle] Đã xóa thư mục: {defaultskin_dir}")
                except Exception as e:
                    print(f"[battle] Lỗi khi xóa {defaultskin_dir}: {e}")

            # Xóa file không hợp lệ
            for file_name in os.listdir(char_dir):
                file_path = os.path.join(char_dir, file_name)
                if os.path.isfile(file_path) and is_invalid_file(file_name, name):
                    try:
                        os.remove(file_path)
                        print(f"[battle] Đã xóa file không hợp lệ: {file_path}")
                    except Exception as e:
                        print(f"[battle] Lỗi khi xóa file {file_path}: {e}")
            
            png_bases = set()
            for file_name in os.listdir(char_dir):
                if file_name.endswith(".png") and not file_name.endswith("[alpha].png"):
                    base = file_name[:-4]  # bỏ ".png"
                    png_bases.add(base)

            for base in png_bases:
                merge_image_alpha(char_dir, base)



def clean_building_files():
    building_dir = os.path.join('data', 'building')
    if not os.path.exists(building_dir):
        print("Không tìm thấy thư mục building.")
        return

    for name in os.listdir(building_dir):
        char_dir = os.path.join(building_dir, name)
        if not os.path.isdir(char_dir):
            continue

        for file_name in os.listdir(char_dir):
            file_path = os.path.join(char_dir, file_name)
            if os.path.isfile(file_path) and is_invalid_file(file_name, name):
                try:
                    os.remove(file_path)
                    print(f"[building] Đã xóa file không hợp lệ: {file_path}")
                except Exception as e:
                    print(f"[building] Lỗi khi xóa file {file_path}: {e}")
        
        png_bases = set()
        for file_name in os.listdir(char_dir):
            if file_name.endswith(".png") and not file_name.endswith("[alpha].png"):
                base = file_name[:-4]  # bỏ ".png"
                png_bases.add(base)

        for base in png_bases:
            merge_image_alpha(char_dir, base)

def commit_push(path, message):
    """Chạy git add + commit + push cho 1 thư mục"""
    try:
        # git add
        subprocess.run(["git", "add", path], check=True)
        # git commit (bỏ qua nếu không có thay đổi)
        result = subprocess.run(
            ["git", "commit", "-m", message],
            check=False,  # để không raise khi không có thay đổi
            text=True,
            capture_output=True,
        )
        if result.returncode == 0:
            print(f"[GIT] Commit thành công: {message}")
            subprocess.run(["git", "push", "origin", "gh-pages"], check=True)
        else:
            print(f"[GIT] Không có thay đổi trong {path}, bỏ qua.")
    except subprocess.CalledProcessError as e:
        print(f"[GIT] Lỗi khi commit/push {path}: {e}")

def git_cleanup_repo(branch):
    """Dọn dẹp Git repo để giảm dung lượng"""
    try:
        sys.stdout.flush()
        print("🧹 Cleaning up git...")

        # Lấy commit hiện tại
        sha = subprocess.check_output(["git", "rev-parse", "HEAD"]).decode().strip()

        # Checkout sang detached HEAD để tránh conflict
        subprocess.run(["git", "checkout", "--detach", sha], check=True)

        # Fetch lại branch (chỉ commit mới nhất)
        subprocess.run(["git", "fetch", "--depth=1", "origin", f"{branch}:{branch}"], check=True)

        # Quay lại branch chính
        subprocess.run(["git", "checkout", branch], check=True)

        # Xóa reflog
        subprocess.run(["git", "reflog", "expire", "--expire=now", "--all"], check=True)

        # Garbage collection
        subprocess.run(["git", "gc", "--prune=now"], check=True)

        print("✅ Git repo đã được tối ưu")
    except subprocess.CalledProcessError as e:
        print(f"[GIT CLEANUP] Lỗi khi dọn repo: {e}")

if __name__ == "__main__":
    move_source_to_data()
    remove_other_dirs()
    clean_data_arts()
    clean_battle_subdirs()
    clean_building_subdirs()
    clean_battle_files()
    clean_building_files()

    commit_push("data/building", "🔄 Auto update building assets")
    commit_push("data/battle/enemies", "🔄 Auto update battle enemies assets")
    commit_push("data/battle/character", "🔄 Auto update battle character assets")
    # commit_push("data/arts/characters", "🔄 Auto update arts characters assets")
    # commit_push("data/arts/enemies", "🔄 Auto update arts enemies assets")
    git_cleanup_repo("gh-pages")