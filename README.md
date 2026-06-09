# OpsForge

<!-- Tech Stack Badges -->
![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![Velite](https://img.shields.io/badge/Velite-0.2.0-purple?style=for-the-badge)
![Fuse.js](https://img.shields.io/badge/Search-Fuse.js-orange?style=for-the-badge)
![Mermaid](https://img.shields.io/badge/Diagrams-Mermaid.js-teal?style=for-the-badge&logo=mermaid)

## Overview

**OpsForge** is a modern, dark-mode-first documentation platform designed to deliver production-ready Cloud & DevOps infrastructure guides, templates, and walkthroughs for cloud engineering. It is optimized for high-performance reading and technical exploration, offering a developer-centric interface with collapsible sidebars, table of contents tracking, tags, instant client-side search, responsive mermaid diagrams, and terminal-optimized command code blocks.

This software works by compiling static MDX files into optimized runtime assets using a schema-validated content layer (Velite) and evaluating them dynamically using React 19's virtual DOM structure. This architecture guarantees extremely fast page load times and standard static HTML distribution while supporting rich, interactive React components inside documentation pages. 

This project was built and is maintained by **Satveek Gupta** to serve as a premium, state-of-the-art reference repository for modern cloud infrastructure practices.

---

## How It Works

This documentation engine leverages a modern static-first architecture:
* **Content Layer ([Velite](https://velite.js.org/))**: Document schemas are defined in `velite.config.ts` with Zod schema validation. MDX markdown files under `content/` are parsed during compilation, validating fields like titles, authors, categories, and tags, and outputting compiled content and table of contents metadata into a static build catalog.
* **Metadata & Code Titles Extraction**: A custom rehype plugin parsed inside `velite.config.ts` extracts metadata like filenames (`title="filename.sh"`) directly from MDX code fences, passing them as props to the rendering engine.
* **Code & CLI Presentation**: Code blocks feature built-in copy capabilities. Command-line blocks (like `bash`/`sh` commands) are rendered in a clean, terminal-like style without bulky window headers, showing a copy button only on hover to keep the prose uncluttered.
* **Dynamic Mermaid Diagrams**: Diagram blocks are intercepted during rendering. The `Mermaid` component evaluates the charts dynamically and applies themeVariables tailored for the dark UI.
* **Dark Theme Focus**: Forced to dark mode via `next-themes`, the interface leverages premium CSS variables, glowing borders, and charcoal background tokens to create a cohesive cloud engineering environment.
* **Instant Search**: The site builds a client-side search index on build using `Fuse.js`, allowing users to open the search console (`Cmd+K`) and query all guides instantly with keyboard navigation.

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 22+** and **npm 10+** installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Satveek-Gupta/dev-docs.git
   cd dev-docs
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables example and configure:
   ```bash
   cp .env.example .env.local
   ```

### Local Development

Run the development server locally:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Contributing

We welcome contributions from the community to improve the guides, add new documentation, or enhance the documentation engine.

### Contribution Steps

1. **Fork the Repository**: Create your own copy of the project on GitHub.
2. **Clone the Fork**: Clone your fork to your local workspace.
   ```bash
   git clone https://github.com/YOUR_USERNAME/dev-docs.git
   ```
3. **Create a Feature Branch**: Create a branch for your changes.
   ```bash
   git checkout -b feature/amazing-new-guide
   ```
4. **Make Your Changes**: Add your markdown guides in the appropriate category under `content/` or update the components in `components/`.
5. **Verify and Test**:
   * Verify TypeScript compilation:
     ```bash
     npm run type-check
     ```
   * Verify the project builds without errors:
     ```bash
     npm run build
     ```
6. **Commit Your Changes**: Commit with a clear and descriptive commit message.
   ```bash
   git commit -m "docs: add comprehensive guide on GitHub Actions security"
   ```
7. **Push to Your Fork**: Push the branch to your GitHub repository.
   ```bash
   git push origin feature/amazing-new-guide
   ```
8. **Submit a Pull Request**: Go to the original repository on GitHub and open a Pull Request (PR) against the `main` branch. Provide a description of what you added or modified.

### Guidelines
* **Code Blocks**: Always specify the language on code blocks (e.g. ` ```bash ` or ` ```yaml `). If the block represents a script or config file, add a filename using `title="name.ext"`.
* **Mermaid Diagrams**: Use standard ` ```mermaid ` fences for diagrams.
* **Theme Support**: Avoid hardcoding colors. Use theme variables defined in `globals.css` (e.g., `var(--text-secondary)`, `var(--bg-surface)`) to preserve the premium dark theme.

