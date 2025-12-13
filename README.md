# GitHub to Word Document Converter

A Python tool that automatically downloads code files from any GitHub repository folder and compiles them into a **professionally formatted Word document** with modern styling, code blocks with background shading, and a beautiful title page.

![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)
![License](https://img.shields.io/badge/License-Educational-green.svg)

## ✨ Key Features

- 📄 **Professional Title Page** - Auto-generated with date and source URL
- 🎨 **Styled Code Blocks** - Consolas font with light gray background shading
- 📁 **Recursive Fetching** - Automatically processes all subdirectories
- 🔢 **Natural Sorting** - Files sorted correctly (1, 2, 10 not 1, 10, 2)
- 🔒 **Private Repo Support** - Works with GitHub Personal Access Tokens
- 🌐 **Multi-Language** - Supports any file extension (Python, Java, C++, JS, etc.)

---

## 🎓 Benefits for University Students

### 📚 Assignment Submission
- **Print-Ready Documentation**: Convert entire code projects into Word documents for physical submission
- **No More Copy-Paste Hassle**: Automatically fetches all files with proper formatting
- **Professional Appearance**: Code appears in monospace font with clear file headers

### 📖 Study & Reference
- **Offline Code Review**: Download professor's sample code or reference implementations for offline study
- **Easy Annotation**: Add notes and highlights directly in Word while reviewing code
- **Create Study Guides**: Compile example solutions into organized documents

### 👥 Group Projects
- **Share Code Easily**: Generate Word documents to share with teammates who may not use Git
- **Code Reviews**: Print code for in-person review sessions
- **Documentation**: Include code snapshots in project reports

### 📝 Thesis & Research
- **Appendix Generation**: Automatically generate code appendices for research papers
- **Consistent Formatting**: All code follows the same professional style
- **Path Tracking**: Each file includes its full path for clear reference

---

## 🛠️ Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Install Required Libraries

```bash
pip install python-docx requests
```

---

## 🚀 Quick Start Guide

### Step 1: Configure the Script

Open `WordMaker.py` and modify the configuration section at the bottom:

```python
# 1. Paste your GitHub folder URL
TARGET_URL = "https://github.com/username/repository/tree/main/folder-name"

# 2. (Optional) For private repos, add your Personal Access Token
TOKEN = None  # or "ghp_your_token_here"
```

### Step 2: Run the Script

```bash
python WordMaker.py
```

### Step 3: Find Your Document

The Word document will be saved in the same directory as the script with the name `Subfolder_Code_Report.docx`.

---

## 📋 Usage Examples

### Example 1: Download C++ Assignment Files
```python
TARGET_URL = "https://github.com/professor/cpp-examples/tree/main/week5-pointers"
agent = GitHubFolderAgent("Week5_Pointers.docx")
agent.run(TARGET_URL, target_extensions=['.cpp', '.h', '.hpp'])
```

### Example 2: Download Python Project
```python
TARGET_URL = "https://github.com/student/ml-project/tree/main/src"
agent = GitHubFolderAgent("ML_Project_Code.docx")
agent.run(TARGET_URL, target_extensions=['.py'])
```

### Example 3: Download Web Development Files
```python
TARGET_URL = "https://github.com/webdev/portfolio/tree/main/src"
agent = GitHubFolderAgent("Web_Project.docx")
agent.run(TARGET_URL, target_extensions=['.html', '.css', '.js'])
```

### Example 4: Download Java Assignment
```python
TARGET_URL = "https://github.com/classmate/java-oop/tree/main/assignment2"
agent = GitHubFolderAgent("OOP_Assignment2.docx")
agent.run(TARGET_URL, target_extensions=['.java'])
```

---

## ⚙️ Customization Options

### Change Output Filename
```python
agent = GitHubFolderAgent("My_Custom_Name.docx")
```

### Specify File Extensions
```python
# For Python files only
agent.run(TARGET_URL, target_extensions=['.py'])

# For multiple languages
agent.run(TARGET_URL, target_extensions=['.py', '.js', '.java', '.cpp'])

# For web files
agent.run(TARGET_URL, target_extensions=['.html', '.css', '.js', '.jsx'])
```

### Access Private Repositories
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens
2. Generate a new token with `repo` scope
3. Add it to the script:
```python
TOKEN = "ghp_your_personal_access_token"
agent = GitHubFolderAgent("Report.docx", github_token=TOKEN)
```

---

## 📄 Output Format

The generated Word document includes:

| Feature | Description |
|---------|-------------|
| **Title Page** | "C++ Subfolder Code Report" centered heading |
| **File Headers** | Each file starts with a Level 1 heading |
| **Path Information** | Full repository path shown in italics |
| **Code Content** | Courier New font, 9pt, properly formatted |
| **Page Breaks** | Each file on a separate page |
| **Natural Sorting** | Files sorted as 1, 2, 10 (not 1, 10, 2) |

---

## 🔧 Troubleshooting

### "Rate limit exceeded" Error
- **Solution**: Add a GitHub Personal Access Token to increase API limits from 60 to 5000 requests/hour

### "Failed to fetch folder contents" Error
- Check if the URL is correct and accessible
- Ensure your internet connection is stable
- For private repos, make them public

### Files Not Appearing in Document
- Verify the file extensions match your `target_extensions` list
- Check if files exist in subdirectories (the tool searches recursively)

---

## 📌 Tips for Students

1. **Bookmark Useful Repos**: Save links to professor's code examples for quick conversion
2. **Batch Processing**: Modify the script to process multiple folders in one run
3. **Version Control**: Add dates to output filenames for tracking versions
4. **Combine with Notes**: After generating, add your own comments and explanations in Word

---

## 🌐 Supporting Different Programming Languages

To download files from different programming languages, modify the `target_extensions` parameter in `WordMaker.py`:

### Language Extension Reference Table

| Language | Extensions to Use |
|----------|-------------------|
| **Python** | `['.py', '.pyw', '.pyi']` |
| **Java** | `['.java']` |
| **JavaScript** | `['.js', '.jsx', '.mjs']` |
| **TypeScript** | `['.ts', '.tsx']` |
| **C/C++** | `['.c', '.cpp', '.h', '.hpp', '.cc']` |
| **C#** | `['.cs']` |
| **Ruby** | `['.rb']` |
| **Go** | `['.go']` |
| **Rust** | `['.rs']` |
| **PHP** | `['.php']` |
| **Swift** | `['.swift']` |
| **Kotlin** | `['.kt', '.kts']` |
| **R** | `['.r', '.R']` |
| **MATLAB** | `['.m']` |
| **SQL** | `['.sql']` |
| **HTML/CSS** | `['.html', '.htm', '.css']` |
| **Shell Scripts** | `['.sh', '.bash']` |
| **All Common** | `['.py', '.java', '.js', '.cpp', '.c', '.h']` |

### How to Change in the Code

Find this line at the bottom of `WordMaker.py`:

```python
agent.run(TARGET_URL, target_extensions=['.cpp', '.h', '.hpp'])
```

Replace it with your desired extensions:

```python
# For Python projects
agent.run(TARGET_URL, target_extensions=['.py'])

# For Full-Stack Web Development
agent.run(TARGET_URL, target_extensions=['.html', '.css', '.js', '.py', '.json'])

# For Mobile Development (Android)
agent.run(TARGET_URL, target_extensions=['.java', '.kt', '.xml'])

# For Data Science
agent.run(TARGET_URL, target_extensions=['.py', '.r', '.R', '.sql', '.ipynb'])
```

---

## 🎨 Customizing Code Font & Style

You can change how the code appears in the Word document by modifying the `process_file` method in `WordMaker.py`.

### Change Code Font

Find this section in the code:

```python
for run in paragraph.runs:
    run.font.name = 'Courier New'
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0, 0, 0)
```

#### Available Font Options

| Font Name | Style | Best For |
|-----------|-------|----------|
| `'Courier New'` | Classic monospace | Default, professional |
| `'Consolas'` | Modern monospace | Windows users |
| `'Monaco'` | Clean monospace | Mac-style look |
| `'Lucida Console'` | Clear monospace | Easy reading |
| `'Source Code Pro'` | Developer favorite | Modern projects |
| `'Fira Code'` | Stylish monospace | Trendy look |

**Example - Change to Consolas:**
```python
run.font.name = 'Consolas'
```

### Change Font Size

```python
# Smaller (good for long files)
run.font.size = Pt(8)

# Default
run.font.size = Pt(9)

# Larger (easier to read)
run.font.size = Pt(10)

# Even larger for presentations
run.font.size = Pt(11)
```

### Change Code Color

```python
# Black (default)
run.font.color.rgb = RGBColor(0, 0, 0)

# Dark Blue (professional)
run.font.color.rgb = RGBColor(0, 0, 139)

# Dark Green (nature theme)
run.font.color.rgb = RGBColor(0, 100, 0)

# Dark Red (standout)
run.font.color.rgb = RGBColor(139, 0, 0)

# Purple (creative)
run.font.color.rgb = RGBColor(128, 0, 128)

# Teal (modern)
run.font.color.rgb = RGBColor(0, 128, 128)
```

### Add Bold or Italic Style

Add these lines after the color setting:

```python
for run in paragraph.runs:
    run.font.name = 'Consolas'
    run.font.size = Pt(10)
    run.font.color.rgb = RGBColor(0, 0, 139)
    run.font.bold = True      # Make code bold
    run.font.italic = False   # Set to True for italic
```

### Complete Custom Style Example

Replace the entire styling section with:

```python
# 3. Code Block - Custom Style
paragraph = self.doc.add_paragraph(code_content)
paragraph.style = 'No Spacing'
for run in paragraph.runs:
    run.font.name = 'Consolas'           # Modern font
    run.font.size = Pt(10)               # Readable size
    run.font.color.rgb = RGBColor(0, 51, 102)  # Dark navy blue
    run.font.bold = False
    run.font.italic = False
```

### Add Background Color (Shading)

To add a background color to your code blocks, add this import at the top of the file:

```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
```

Then add this function to the class:

```python
def add_shading(self, paragraph, color="E8E8E8"):
    """Adds background shading to a paragraph."""
    shading = OxmlElement('w:shd')
    shading.set(qn('w:fill'), color)
    paragraph._p.get_or_add_pPr().append(shading)
```

Use it like this:

```python
paragraph = self.doc.add_paragraph(code_content)
self.add_shading(paragraph, "F5F5F5")  # Light gray background
```

#### Popular Background Colors

| Color Code | Description |
|------------|-------------|
| `"F5F5F5"` | Light Gray (recommended) |
| `"FFFACD"` | Light Yellow |
| `"E6F3FF"` | Light Blue |
| `"F0FFF0"` | Light Green |
| `"FFF0F5"` | Light Pink |
| `"F5F5DC"` | Beige |

---

## 📜 License

This tool is free to use for educational purposes.

---

## 🤝 Contributing

Feel free to fork and improve this tool! Suggestions:
- Add syntax highlighting
- Support for more output formats (PDF, HTML)
- GUI interface for easier use

---

**Happy Coding! 🚀**
