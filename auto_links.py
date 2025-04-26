import os

vault_path = r'C:\Users\zeray\Desktop\vaults'  # <<< kendi vault yolun

def get_markdown_files(folder_path):
    return [f for f in os.listdir(folder_path) if f.endswith('.md')]

def create_links(current_file, files):
    links = []
    for f in files:
        if f != current_file:
            note_title = os.path.splitext(f)[0]
            links.append(f"[[{note_title}]]")
    return links

def remove_old_links(content):
    if '## Related Notes' in content:
        return content.split('## Related Notes')[0].rstrip()
    return content

def process_folder(folder_path):
    files = get_markdown_files(folder_path)
    for file in files:
        file_path = os.path.join(folder_path, file)
        
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Eski "Related Notes" kısmını temizle
        content = remove_old_links(content)
        
        # Yeni linkleri hazırla
        links = create_links(file, files)
        new_content = content + '\n\n##### Related Notes\n'
        for link in links:
            new_content += f"- {link}\n"

        # Dosyayı güncelle
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

def main():
    for root, dirs, files in os.walk(vault_path):
        md_files = [f for f in files if f.endswith('.md')]
        if md_files:
            process_folder(root)

if __name__ == "__main__":
    main()
