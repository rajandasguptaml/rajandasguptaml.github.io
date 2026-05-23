# Personal Portfolio Site

A clean, single-page academic/personal portfolio. Pure HTML/CSS/JS — no build step, no dependencies. Ready to host on GitHub Pages.

## What's here

- `index.html` — all content, organized into Hero, News, Research, Publications, Experience, Education, Service, Others
- `styles.css` — light + dark theme, responsive layout
- `script.js` — theme toggle, mobile nav, dynamic year
- `assets/` — drop your photo, CV, etc. here

## How to customize

Open `index.html` and search for these placeholders, then replace them:

| Placeholder        | Where                                  |
|--------------------|----------------------------------------|
| `Your Name`        | Title, hero, footer                    |
| `YN`               | Brand initials and avatar              |
| `you@example.com`  | Email badge                            |
| `yourhandle`       | Social links (GitHub, LinkedIn, etc.)  |
| `cv.pdf`           | Link to your CV (drop the file in repo root) |

To use a real photo instead of the initials avatar: drop `me.jpg` into `assets/`, then replace the `<div class="avatar">…</div>` block with:

```html
<img class="avatar" src="assets/me.jpg" alt="Your Name" />
```

…and add `object-fit: cover;` to `.avatar` in `styles.css` if needed.

## Deploy to GitHub Pages

1. Create a new repo on GitHub. If you want the site at `https://<your-username>.github.io/`, name the repo **exactly** `<your-username>.github.io`. For any other name, the site will live at `https://<your-username>.github.io/<repo-name>/`.

2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save.**

4. Wait ~30 seconds, then visit your site URL.

## Local preview

Just open `index.html` in a browser. Or, for a proper local server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Notes

- Layout inspired by minimalist academic portfolios. All code and content here is original / template placeholder — fill it in with your own.
- Dark mode follows the system preference on first load, and remembers your choice after.
