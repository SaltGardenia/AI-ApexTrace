# Project Agents & Skills Index

This file registers the specialist capabilities available to the ApexTrace project
(an AI research-landscape analytics dashboard — see `PLAN.md` / `LIST.md`).
All 15 capabilities below are installed both as **skills** (`.kilo/skills/<id>/SKILL.md`,
invokable via the `skill` tool) and as **agents** (`.kilo/agents/<id>.md`, invokable
via task delegation). They cover the full frontend stack chosen for the build.

## How to invoke
- **As a skill (direct guidance):** call the `skill` tool with the name in the `Skill ID` column.
  Use when you need the capability's instructions applied inline.
- **As an agent (delegated work):** use the `task` tool and reference the `Agent ID` (same id).
  Use when the work is a self-contained implementation/review subtask.

## Capability roster (15)

### 🔥 Core
| Capability | Skill ID / Agent ID | Use for |
|------------|---------------------|---------|
| React | `react-expert` | React components, hooks, state, rendering, RSC |
| Next.js | `nextjs-expert` | App Router, RSC, data fetching, caching, middleware, API routes |
| TypeScript | `typescript-expert` | Typing, generics, strict mode, type-error fixes, tsconfig |

### 🎨 Design
| Capability | Skill ID / Agent ID | Use for |
|------------|---------------------|---------|
| UI/UX Design | `ui-ux-designer` | Page design, IA, visual hierarchy, UX review |
| Tailwind CSS | `tailwind-expert` | Utility styling, responsive, theming, config |
| shadcn/ui | `shadcn-expert` | Component install, theming via CSS vars, Radix composition |

### ✨ Animation
| Capability | Skill ID / Agent ID | Use for |
|------------|---------------------|---------|
| Framer Motion | `framer-motion-expert` | React UI motion, micro-interactions, enter/exit |
| GSAP | `gsap-expert` | Timelines, ScrollTrigger, scroll-driven sequences |

### 🌐 3D
| Capability | Skill ID / Agent ID | Use for |
|------------|---------------------|---------|
| React Three Fiber | `react-three-fiber-expert` | Declarative Three.js in React |
| Three.js | `threejs-expert` | Scene/camera/renderer, materials, lights, post-processing |
| GLSL | `glsl-expert` | Vertex/fragment shaders, noise, lighting |

### 🏗 Engineering
| Capability | Skill ID / Agent ID | Use for |
|------------|---------------------|---------|
| Frontend Architecture | `frontend-architecture-expert` | App structure, module boundaries, state, data flow |
| Performance Optimization | `performance-expert` | Core Web Vitals, bundle size, render cost, profiling |
| SEO | `seo-expert` | Metadata, Open Graph, structured data, sitemaps |
| Accessibility | `accessibility-expert` | WCAG, semantic HTML, ARIA, keyboard, contrast |

## Conventions for this project
- Stack: Next.js (App Router) + React + TypeScript + Tailwind + shadcn/ui.
- Keep Server Components for data; mark interactive pieces `'use client'`.
- Charts/dashboards: prefer accessible, performant patterns (virtualize, memoize, lazy-load three.js).
- Honor `prefers-reduced-motion` in all animation work.
- Delegate specialized subtasks (e.g., a 3D globe, a GSAP scroll section, an a11y audit)
  to the matching agent to keep the orchestrator focused.
