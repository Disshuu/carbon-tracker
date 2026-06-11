# Changelog

All notable changes to EcoTrace are documented in this file.

## [1.1.0] — 2026-06-11

### Added
- Unit tests for carbon footprint calculation logic
- Component tests for App and ErrorBoundary
- Error boundary for graceful failure handling
- Accessibility improvements (ARIA labels, semantic HTML, screen-reader support)
- Security headers via `vercel.json` (X-Frame-Options, XSS protection, Referrer-Policy)
- SEO meta tags and Open Graph tags
- Web app manifest and `robots.txt`
- GitHub Actions CI pipeline (test + build on every push)
- MIT License

### Changed
- Replaced unused `axios` dependency
- Optimized chart and tip computations with `useMemo`
- Optimized navigation handlers with `useCallback`
- Reduced font sizes on landing page for proper responsive fit
- Prevented duplicate style injection on landing page

### Fixed
- ESLint warnings (unused imports)
- Landing page layout overflow on smaller screens

## [1.0.0] — 2026-06-08

### Added
- Initial release for PromptWars 2026 Main Challenge 3
- 3-step carbon footprint calculator (Transport, Food, Home Energy)
- Visual dashboard with pie chart and benchmark bar chart
- Personalized recommendation engine based on user inputs
- India-specific emission factors
