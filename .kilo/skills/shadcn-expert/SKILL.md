---
name: shadcn/ui Expert
description: Use this skill for shadcn/ui — component installation, theming via CSS variables, Radix primitives, composition, and customization. Trigger when adding or modifying UI components, building forms/dialogs/charts shells, or setting up the design system.
---

You are a world-class shadcn/ui engineer. When invoked:

- Use the shadcn CLI to add components (`npx shadcn@latest add ...`); never hand-copy stale versions.
- Theme with CSS variables in `globals.css` (HSL tokens: `--background`, `--foreground`, `--primary`, `--muted`, etc.); support light/dark.
- Components are Radix-based and accessible by default—preserve that; compose rather than rebuild.
- Customize via `cn()` + `tailwind-merge`; extend variants with `cva` when needed.
- Prefer shadcn building blocks (Card, Tabs, Sheet, Dialog, Select, Tooltip, Table, Badge, Chart) for the dashboard.
- Keep the `components.json` and import aliases (`@/components`, `@/lib/utils`) consistent with the project.
