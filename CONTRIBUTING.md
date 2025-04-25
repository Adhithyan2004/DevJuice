# Contributing to Dev Juice

Welcome!   
Thanks for checking out **Dev Juice** — an open-source hub for frontend dev tools, UI/UX inspiration, and design assets.  
Whether you're fixing a typo, suggesting a tool, improving the UI, or diving into code — contributions of all kinds are appreciated!

---

## 📚 Table of Contents

- [Ground Rules](#--ground-rules)
- [Ways to Contribute](#--ways-to-contribute)
  - [1. Code Contributions](#1--code-contributions)
  - [2. UI/UX Suggestions](#2--uiux-suggestions)
  - [3. Recommend Tools](#3--recommend-tools)
  - [4. Report Bugs](#4--report-bugs)
  - [5. Request Features](#5--request-features)
- [Code Style & Folder Structure](#--code-style--folder-structure)
- [Local Setup Guide](#--local-setup-guide)
- [Submitting a Pull Request](#submitting-a-pull-request)


---

##  Ground Rules

- Be respectful and kind — we're here to learn and build together.
- Keep your commits clean and descriptive (use conventional commits if possible).
- Follow the structure and style of the project (code, naming, formatting).
- Always create an issue first unless it’s a quick fix.
- Don’t self-promote tools — if you’re submitting your own, make sure it genuinely helps others.

---

##  Ways to Contribute

### 1.  Code Contributions

- Add new features (e.g., dark mode, animations, filters)
- Fix bugs listed in the [Issues](../../issues) tab
- Improve responsiveness or accessibility
- Refactor and optimize code

### 2.  UI/UX Suggestions

- Share new layout ideas or animation enhancements
- Submit design improvements or accessibility fixes
- Open a design suggestion issue or attach Figma links
- Screenshots are also welcome

### 3.  Recommend Tools

- Discover a useful dev or design tool? Suggest it!
- You can either submit it via the website form or open an issue titled `Tool Suggestion`.

### 4.  Report Bugs

To report a bug, please include:

- Issue: Briefly describe what went wrong - Steps to Reproduce: Step-by-step actions - Expected Behavior: What should have happened - Environment: Browser/device details (optional)

### 5.  Request Features

Open an issue titled `[Feature]` and describe your idea clearly. Screenshots/mockups are welcome!

---

##  Code Style & Folder Structure

> We try to keep things consistent, but this is still a growing project! Here's how we structure things right now:

###  Frontend (Next.js)
- We use **TypeScript (`.tsx`)** files for all components
- Pages go inside `app/`, components in `components/`, and API calls in `lib/api.ts`
- Follow a **functional and modular** approach (1 file = 1 purpose)

Please format your code with **Prettier** and **ESLint** if you're making changes.

###  Backend (FastAPI)
- API routes are grouped in files inside the `routers/` folder (`tools.py`, `auth.py`, etc.)
- We use **Pydantic models** for request/response schemas (in `schemas/`)
- DB logic stays in `database.py` and `crud.py` (separated for clarity)

Use `black` for Python formatting and keep endpoints RESTful.

---

##  Local Setup Guide

```bash
# Clone the repository
git clone https://github.com/<your-username>/dev-juice.git
cd dev-juice
```

Frontend
```bash
npm install
npm run dev
```

Backend
```bash
cd server
venv\Scripts\Activate
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
6. Open a **Pull Request** to the `main` branch.

⚠️ Your PR may be reviewed before merging.  Make sure your code is tested and the UI looks clean.


Thanks again for being awesome and contributing! — Adhithyan

