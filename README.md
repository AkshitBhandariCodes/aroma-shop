# Aroma

Aroma is a **luxury perfume e-commerce demo**: a polished marketing landing experience with a **shoppable product grid**, **product detail pages**, and a **session-backed shopping bag**. The stack pairs a **React (Create React App)** frontend so product data, the cart, and lightweight account sign-up / login stay in sync.

Use it as a reference implementation for a split **frontend + API** workflow, or as a starting point for a production catalog (with real persistence, payments, and security hardening added on top).

---

## Purpose

- **Showcase** a high-end “perfume boutique” brand site: hero, collections, promos, benefits, community, and newsletter sections.
- **Browse and buy flow (demo):** filter products, open **product detail**, add items to **cart**, adjust quantities, and see a subtotal.
- **Auth (demo):** register and log in; the API stores users in a **local JSON file** (development only) and tracks the signed-in user in an **HTTP-only session cookie**.
- **Developer experience:** one **`npm install`** from the repo root installs root, client, and server dependencies; one **`npm run dev`** starts both processes.

---

## Requirements

- **Node.js** 18+ recommended (aligned with current LTS).
- **npm** 8+ (npm 7+ is required for the `postinstall` / `--prefix` flow used here).

---

## Install

From the **repository root** (`aroma` / `demo` — the folder that contains `package.json`, `client/`):

```bash
npm install
```

## Useful scripts (repo root)

| Script          | Description                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `npm install`   | Installs root, `client` dependencies.                                                                          |
| `npm run dev`   | Runs API + React dev server together.                                                                          |
| `npm run build` | Production build of the client into `client/build`.                                                            |
| `npm run clean` | Removes `node_modules` (all three), `client/build`, local demo DB file, etc. **Then run `npm install` again.** |

---

## Project layout

```text
├── client/                 # React app (CRA)
│   ├── public/             # Static shell (e.g. index.html)
│   └── src/
│       ├── assets/images/  # Bundled images (imported via webpack)
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── ...
├── server/
│   ├── server.js           # Express app + routes
│   └── data/
│       ├── products.json   # Catalog JSON
│       └── users.json      # Created locally for demo users (gitignored)
├── scripts/
│   └── clean.mjs           # Deep clean helper
└── package.json            # Orchestrates install + dev
```

---

## Images

Product and marketing images are loaded from **`client/src/assets/images/`** (not from `public/`). Filenames must match what **`client/src/assets/images.js`**, **`constants`**, and **`server/data/products.json`** expect (e.g. `grid-ref-1.jpg`, `hero-ref-left.jpg`). Missing files simply produce empty `src` until you add the asset.

---

## API overview (Express)

| Method                              | Path                | Role                 |
| ----------------------------------- | ------------------- | -------------------- |
| `GET`                               | `/api/health`       | Health check         |
| `GET`                               | `/api/products`     | Product list         |
| `GET`                               | `/api/products/:id` | Product detail       |
| `POST`                              | `/api/register`     | Sign up (demo)       |
| `POST`                              | `/api/login`        | Sign in (demo)       |
| `GET`                               | `/api/me`           | Current session user |
| `POST`                              | `/api/logout`       | End session          |
| `GET` / `POST` / `PATCH` / `DELETE` | `/api/cart*`        | Session cart         |

Auth and cart responses rely on **cookies**; the React app uses **`credentials: 'include'`** on relevant `fetch` calls.

---

## License

Private / demo — add a license if you open-source the repo.
