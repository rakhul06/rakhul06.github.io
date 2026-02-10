# Portfolio (Vite + React)

## Deploy to GitHub Pages with `rakhul.dev`

This repo is set up to build on every push to `main` and deploy the `dist/` output to GitHub Pages via GitHub Actions.

### 1) Create the GitHub repo + push code

Create a new GitHub repository (recommended name: `<your-username>.github.io`, e.g. `Rakhul07.github.io`), then run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

### 2) Enable Pages (GitHub Actions)

In your GitHub repo:

- **Settings → Pages**
- **Build and deployment → Source:** select **GitHub Actions**

After that, every push to `main` deploys automatically (see the **Actions** tab).

### 3) Set your custom domain in GitHub

In **Settings → Pages**:

- **Custom domain:** `rakhul.dev`
- Enable **Enforce HTTPS** (after DNS propagates / cert is issued)

Note: this repo includes `public/CNAME` so the deployed site contains the domain name.

### 4) Point Name.com DNS to GitHub Pages

In Name.com DNS management, add:

**A records (apex/root domain)**

- Type: `A` | Host: `@` | Value: `185.199.108.153`
- Type: `A` | Host: `@` | Value: `185.199.109.153`
- Type: `A` | Host: `@` | Value: `185.199.110.153`
- Type: `A` | Host: `@` | Value: `185.199.111.153`

**CNAME (www subdomain)**

- Type: `CNAME` | Host: `www` | Value: `<your-username>.github.io`

### 5) Verify it’s live

- Wait for DNS propagation (often minutes, sometimes up to 24–48 hours).
- Check GitHub: **Repo → Settings → Pages** for domain + HTTPS status.
- Visit `https://rakhul.dev`.

