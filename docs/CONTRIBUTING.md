# Contributing to Dev Juice

Welcome!  
Thanks for checking out **Dev Juice** — an open-source hub for frontend dev tools, UI/UX inspiration, and design assets.  
Whether you're fixing a typo, suggesting a tool, improving the UI, or diving into code — contributions of all kinds are appreciated!

---

## Table of Contents

- [Ground Rules](#ground-rules)
- [Ways to Contribute](#ways-to-contribute)
  - 1. Code Contributions
  - 2. UI/UX Suggestions
  - 3. Recommend Tools
  - 4. Report Bugs
  - 5. Request Features
- [How to Structure an Issue](#how-to-structure-an-issue)
- [Code Style & Folder Structure](#code-style--folder-structure)
- [Local Setup Guide](#local-setup-guide)
- [Submitting a Pull Request](#submitting-a-pull-request)

---

## Ground Rules

- Be respectful and kind — we're here to learn and build together.
- Keep your commits clean and descriptive (use conventional commits if possible).
- Follow the structure and style of the project (code, naming, formatting).
- Always create an issue first unless it’s a quick fix.
- Don’t self-promote tools — if you’re submitting your own, make sure it genuinely helps others.

---

## Note

- Some parts of the project — like admin login, moderation flow, and authentication — are still under development and may be unstable. If you'd like to contribute to these areas, please discuss in an issue first.
- We don’t have issue or PR templates yet — just drop your idea or fix in whatever format makes sense. Clear titles and a short description help a lot!

---

## Ways to Contribute

### 1. Code Contributions

- Add new features (e.g., dark mode, animations, filters)
- Fix bugs listed in the [Issues](https://github.com/Adhithyan2004/DevJuice/issues) tab
- Improve responsiveness or accessibility
- Refactor and optimize code

### 2. UI/UX Suggestions

- Share new layout ideas or animation enhancements
- Submit design improvements or accessibility fixes
- Open a design suggestion [issue](https://github.com/Adhithyan2004/DevJuice/issues) or attach Figma links
- Screenshots are also welcome

### 3. Recommend Tools

- Discover a useful dev or design tool? Suggest it!
- You can submit it via the website form.
- Before submitting, read the tool submission rules [TOOL_ADDING.md](https://github.com/Adhithyan2004/DevJuice/blob/main/docs/TOOL_ADDING.md)

### 4. Report Bugs

To report a bug, please include:

- Issue: Briefly describe what went wrong
- Steps to Reproduce: Step-by-step actions
- Expected Behavior: What should have happened
- Environment: Browser/device details

### 5. Request Features

Open an [issue](https://github.com/Adhithyan2004/devjuice/issues) titled `[Feature]` and describe your idea clearly. Screenshots/mockups are welcome!

### 6. Security Issues

Read [SECURITY.md](https://github.com/Adhithyan2004/DevJuice/blob/main/docs/SECURITY.md) for details

---

## How to Structure an Issue

**To help us understand and respond to your issue faster, please follow this format when creating issues:**

- Bug Report
  Title: [Bug] Unexpected behavior when... <br>
  Description: A short summary of the issue<br>
  Steps to Reproduce: List the steps you took<br>
  Expected Behavior: What you expected to happen<br>
  Environment: Browser, OS, screen size, etc.<br>
  Screenshot (optional)

- Feature Request
  Title: [Feature] Add ability to...<br>
  Idea: Describe the feature or enhancement<br>
  Why: Why is this useful? Who benefits from it?<br>
  Alternatives: Any workarounds or similar ideas<br>
  Visuals (optional): Mockups, Figma link, etc.<br>

- Security Issue
  Title: [Security] Describe the issue<br>
  Description: What vulnerability or risk did you find?<br>
  Steps: How can it be reproduced (if applicable)?<br>
  Impact: What parts of the system could be affected (e.g., login, tool submission)?<br>
  Suggestion (optional): Any fix or mitigation ideas<br>

**Please do not share sensitive exploits publicly. You can email us privately or use a draft PR if needed.**

---

## Code Style & Folder Structure

> We try to keep things consistent, but this is still a growing project! Here's how we structure things right now:

### Frontend (Next.js)

- We use **TypeScript (`.tsx`)** files for all components
- Pages go inside `app/`, components in `components/`
- Auth and tool-related API functions are defined in `lib/api.ts`.
- Other APIs can be called directly in the respective components using **Axios.**
- Follow a **functional and modular** approach (1 file = 1 purpose)

Please format your code with **Prettier** and **ESLint** if you're making changes.

### Backend (FastAPI)

- API routes are grouped in files inside the `routers/` folder (`tools.py`, `admin_routes.py`, etc.)
- We use **Pydantic models** for request/response schemas (in `schemas/`)
- DB logic stays in `database.py` and `crud.py` (separated for clarity)
- Database models (ORM classes) are defined in `models.py`.

Use `black` for Python formatting and keep endpoints RESTful.

---

## Local Setup Guide

```bash
# Clone the repository
git clone https://github.com/<your-username>/DevJuice.git
cd dev-juice
```

Frontend

```bash
# Install dependencies
npm install
# Run the frontend
npm run dev
```

Backend

```bash
cd server
# Activate your virtual environment
venv\Scripts\Activate
# Install dependencies
pip install -r requirements.txt
# Run the FastAPI server
uvicorn app.main:app --reload
```

---

## Submitting a Pull Request

1. **Fork** the repo and **clone** it to your local machine.
2. Create a **new branch** from `main` with a meaningful name:
   - `feat/`, `fix/`, `docs/` prefix is encouraged.
   - Example: `feat/tool-filter`, `fix/responsive-footer`, `docs/contributing-guide`
3. Make your changes and **test locally** if applicable.
4. **Update documentation** (like the README or UI instructions) if your change affects usage or setup.
5. Commit with a clear message and push your branch.
6. Open a **_Pull Request_** from your feature branch into the `main` branch of this repository.
   Make sure your changes are tested and clearly described. Use a draft PR if it's still in progress.

**Your PR may be reviewed before merging. Make sure your code is tested and the UI looks clean.**

> **Public Beta Notice**  
> Dev Juice is currently in **public beta**. Features may change, and bugs might pop up.  
> We’d love your feedback — feel free to [open an issue](https://github.com/Adhithyan2004/devjuice/issues) or start a [discussion](https://github.com/Adhithyan2004/devjuice/discussions).

Thanks again for being awesome and contributing!
