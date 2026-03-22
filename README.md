# React + Vite

## WhatsApp Message Demo (UltraMsg)

1) Create a `.env` file (you can copy from `.env.example`):

- `VITE_ULTRAMSG_INSTANCE_ID=...`
- `VITE_ULTRAMSG_TOKEN=...`

2) Install and run:

- `npm install`
- `npm run dev`

3) Open the app and fill:

- **To**: phone number (example: `94771234567`)
- **Message**: your text

Note: During `npm run dev`, the app uses a Vite proxy (`/ultramsg`) to reduce CORS issues.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
