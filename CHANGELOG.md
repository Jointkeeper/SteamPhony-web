# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- ITCSS 7-layer architecture and design-token system (colors, typography, motion).
- Tailwind config driven by CSS custom properties.
- Button atom with trust / action / neutral variants & full state matrix.
- PortfolioCard atom with 3D hover, lazy-loaded images and skeleton blur-up.
- ContactForm molecule using React Hook Form + Zod with progressive validation.
- Barrel exports and path aliases (`@atoms`, `@molecules`, …) for cleaner imports.
- Jest & Vitest alias support; backend Jest config.
- Storybook stories + a11y addon; Percy baseline matrix.
- Comprehensive documentation (`docs/architecture.md`) with ITCSS ↔ Atomic Design and Data-Flow diagrams.

### Changed
- Migrated frontend to strict TypeScript.
- Refactored project structure following Atomic Design principles.

### Performance
- Lazy image loading & `contain` to isolate repaints.
- GPU-accelerated interactions (translate / rotate with `will-change`).

### Security & Accessibility
- WCAG-compliant color contrast; focus rings integrated with trust palette.
- Keyboard navigation & ARIA roles for interactive components. 