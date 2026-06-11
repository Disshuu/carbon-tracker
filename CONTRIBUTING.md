# Contributing to EcoTrace

Thanks for your interest in EcoTrace! This project was built for PromptWars 2026 (Main Challenge 3 — Carbon Footprint Awareness Platform), but contributions and suggestions are welcome.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/carbon-tracker.git
   cd carbon-tracker
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Running Tests

```bash
npm test -- --watchAll=false
```

## Code Style

- Functional React components with hooks
- Keep components focused — one component per file
- Use `useMemo` / `useCallback` for expensive computations or stable handlers
- Add `aria-label` / semantic HTML for any new interactive elements

## Submitting Changes

1. Create a new branch for your change
2. Make your changes and ensure tests pass
3. Open a pull request describing what you changed and why

## Reporting Issues

If you find a bug or have a suggestion, please open an issue with:
- A clear description of the problem
- Steps to reproduce (if applicable)
- Expected vs actual behavior
