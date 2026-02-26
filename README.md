# paint

A minimal creative portfolio for displaying work by category.

---

## Setup

1. Install Node.js from https://nodejs.org (LTS version)

2. In this folder, run:
   ```
   npm install
   npm run dev
   ```

3. Open:
   - **Portfolio** → http://localhost:5173
   - **Admin** → http://localhost:5173/admin.html

---

## Change your password

Open `src/data.js` and update:
```js
export const ADMIN_PASSWORD = "changeme123";
```

---

## Deploy (free via Netlify)

```
npm run build
```
Drag the `dist/` folder to https://netlify.com

- Site → `yoursite.netlify.app`
- Admin → `yoursite.netlify.app/admin`

---

## Add your work

Go to `/admin`, log in, then:
- Upload images or videos from your computer
- Or paste an image URL
- Set title + category
- Use ↑↓ to reorder
- Hit "Add to site"

Changes appear instantly on the live portfolio.
