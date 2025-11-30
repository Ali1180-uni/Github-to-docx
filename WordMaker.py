import os
import requests
import re
from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
from urllib.parse import urlparse

class GitHubFolderAgent:
    def __init__(self, output_filename="Cpp_Subfolder_Report.docx", github_token=None):
        self.output_filename = output_filename
        self.doc = Document()
        self.github_token = github_token # Optional: For private repos or higher rate limits
        self._setup_document_style()

    def _setup_document_style(self):
        """Sets up the visual style of the Word document."""
        style = self.doc.styles['Normal']
        font = style.font
        font.name = 'Calibri'
        font.size = Pt(11)
        
        # Add a title
        heading = self.doc.add_heading('C++ Subfolder Code Report', 0)
        heading.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER

    def get_headers(self):
        """Returns headers for GitHub API requests."""
        headers = {'Accept': 'application/vnd.github.v3+json'}
        if self.github_token:
            headers['Authorization'] = f'token {self.github_token}'
        return headers

    def parse_github_url(self, url):
        """
        Converts a browser URL to a GitHub API URL.
        Input: https://github.com/owner/repo/tree/branch/path/to/folder
        Output: https://api.github.com/repos/owner/repo/contents/path/to/folder?ref=branch
        """
        parsed = urlparse(url)
        path_parts = parsed.path.strip('/').split('/')
        
        if len(path_parts) < 2:
            raise ValueError("Invalid GitHub URL")

        owner = path_parts[0]
        repo = path_parts[1]
        
        # Default API path
        api_url = f"https://api.github.com/repos/{owner}/{repo}/contents"
        params = {}

        # Handle subfolders and branches
        # format: /owner/repo/tree/branch/path...
        if len(path_parts) > 3 and path_parts[2] == 'tree':
            branch = path_parts[3]
            subpath = "/".join(path_parts[4:])
            api_url = f"{api_url}/{subpath}"
            params['ref'] = branch
            
        return api_url, params

    def natural_key(self, string_):
        """
        Returns a key for natural sorting (e.g., 1, 2, 10 instead of 1, 10, 2).
        Splits string into text and number chunks.
        """
        return [int(s) if s.isdigit() else s.lower() for s in re.split(r'(\d+)', string_)]

    def fetch_files_recursive(self, api_url, params, target_extensions):
        """
        Recursively fetches files from the GitHub API.
        """
        print(f"[Agent] Checking: {api_url}")
        try:
            response = requests.get(api_url, headers=self.get_headers(), params=params)
            response.raise_for_status()
            items = response.json()
        except Exception as e:
            print(f"[Error] Failed to fetch folder contents: {e}")
            return

        # If the URL points to a single file, items is a dict, not a list
        if isinstance(items, dict):
            items = [items]
        
        # Sort items naturally before processing
        # This fixes the "1, 10, 11, 2" sorting issue
        if isinstance(items, list):
            items.sort(key=lambda x: self.natural_key(x['name']))

        for item in items:
            if item['type'] == 'file':
                # Check extension
                if any(item['name'].endswith(ext) for ext in target_extensions):
                    self.process_file(item)
            
            elif item['type'] == 'dir':
                # Recursively go into subdirectories
                self.fetch_files_recursive(item['url'], params, target_extensions)

    def process_file(self, file_item):
        """Downloads raw content and adds it to Word doc."""
        name = file_item['name']
        download_url = file_item['download_url']
        path = file_item['path']

        print(f"[Agent] Downloading: {name}...")
        
        try:
            content_resp = requests.get(download_url, headers=self.get_headers())
            content_resp.raise_for_status()
            code_content = content_resp.text
            
            # --- Write to Word ---
            # 1. Heading (Filename with full path context)
            self.doc.add_heading(f"File: {name}", level=1)
            
            # 2. Add Path info for clarity
            p_path = self.doc.add_paragraph(f"Path: {path}")
            p_path.runs[0].italic = True
            p_path.runs[0].font.size = Pt(9)

            # 3. Code Block
            paragraph = self.doc.add_paragraph(code_content)
            paragraph.style = 'No Spacing'
            for run in paragraph.runs:
                run.font.name = 'Courier New'
                run.font.size = Pt(9)
                run.font.color.rgb = RGBColor(0, 0, 0)

            self.doc.add_page_break()
            
        except Exception as e:
            print(f"[Error] Could not download file {name}: {e}")

    def run(self, folder_url, target_extensions=['.cpp', '.h', '.hpp']):
        """Main execution function."""
        try:
            api_url, params = self.parse_github_url(folder_url)
            print(f"[Agent] Targeting API: {api_url}")
            
            self.fetch_files_recursive(api_url, params, target_extensions)
            
            self.doc.save(self.output_filename)
            print(f"\n[Success] Document saved as: {self.output_filename}")
            
        except Exception as e:
            print(f"[Fatal Error] {e}")

# --- CONFIGURATION SECTION ---
if __name__ == "__main__":
    # 1. PASTE YOUR GITHUB SUBFOLDER LINK HERE
    # Example: "https://github.com/tensorflow/tensorflow/tree/master/tensorflow/core/kernels"
    TARGET_URL = "https://github.com/YourName/YourRepo/tree/main/YourSubfolder" 

    # 2. (Optional) If repo is PRIVATE, put your Personal Access Token here:
    # TOKEN = "ghp_xxxxxxxxxxxxxxx"
    TOKEN = None 

    agent = GitHubFolderAgent("Subfolder_Code_Report.docx", github_token=TOKEN)
    
    # 3. Run
    agent.run(TARGET_URL, target_extensions=['.cpp', '.h', '.hpp'])