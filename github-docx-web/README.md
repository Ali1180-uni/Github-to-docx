# GitHub to DOCX Web Application

A beautiful web-based tool to convert GitHub repositories into Word documents with a modern React frontend and Python Flask backend.

## ✨ Features

- 🐟 **Beautiful Fish Animations** - Underwater-themed UI with swimming fish and bubbles
- 🎯 **Custom Cursor Effects** - Interactive cursor with trails and ripple effects
- 📁 **Folder-wise Documents** - Creates separate DOCX files for each folder in the repo
- 🔒 **Private Repo Support** - Use GitHub tokens for private repositories
- 📊 **Real-time Progress** - Track conversion progress with live updates
- 🎨 **Professional Styling** - Code blocks with syntax-appropriate formatting

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the server:
```bash
python app.py
```

The API will be running at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📖 Usage

1. Open the web application in your browser
2. Paste a GitHub repository or folder URL
3. (Optional) Add your GitHub token for private repositories
4. Select file extensions to include
5. Click "Start Conversion"
6. Download your generated DOCX files

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/convert` | POST | Start a new conversion job |
| `/api/status/<job_id>` | GET | Get job status and progress |
| `/api/download/<job_id>/<filename>` | GET | Download a generated file |
| `/api/cleanup/<job_id>` | DELETE | Clean up job files |

## 🎨 Tech Stack

### Frontend
- React 18
- Framer Motion (animations)
- Lucide React (icons)
- CSS3 with modern features

### Backend
- Python 3.x
- Flask (web framework)
- python-docx (Word document generation)
- Requests (GitHub API calls)

## 📁 Project Structure

```
github-docx-web/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── output/             # Generated files (created at runtime)
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── FishAnimation.js/.css
    │   │   ├── CursorEffect.js/.css
    │   │   ├── Header.js/.css
    │   │   ├── ConverterForm.js/.css
    │   │   ├── ProgressPanel.js/.css
    │   │   ├── ResultsPanel.js/.css
    │   │   └── Footer.js/.css
    │   ├── App.js/.css
    │   ├── index.js/.css
    │   └── ...
    └── package.json
```

## 🐟 Animation Features

### Fish Animation
- Multiple colorful fish swimming across the screen
- Realistic tail and fin movements
- Rising bubbles effect
- Swaying seaweed at the bottom
- Light rays from above

### Cursor Effects
- Custom cursor with glow effect
- Trail following the cursor
- Ripple effect on click
- Bubble particles on movement
- Hover state changes for interactive elements

## 📝 License

MIT License - feel free to use this project for any purpose.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
