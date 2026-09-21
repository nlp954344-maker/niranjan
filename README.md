# Respondr — College Student Survey Platform (Assam)

> A mobile-first, trilingual survey platform for college students across Assam exploring campus t-shirts and merchandise culture.

---

## 🌐 Live Website Links

- **Development Preview**: [Open App in Cloud Run](https://ais-dev-qwpm3x44atueopx3ywvmzi-950832142026.asia-east1.run.app)
- **Shared Production Link**: [Open Shared App](https://ais-pre-qwpm3x44atueopx3ywvmzi-950832142026.asia-east1.run.app)

---

## 🚀 How to Enable GitHub Pages (To see the real website)

If you see a blank page or a banner image instead of the website, follow these steps in your GitHub repository:

### Method 1: Using `/docs` Folder (Recommended & Fastest)

1. Open your repository on GitHub.
2. Click **Settings** (tab at the top right of your repo).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` (or `master`)
   - **Folder**: Select `/docs` (⚠️ **Do NOT leave it on `/(root)`**)
5. Click **Save**.
6. Wait 30–60 seconds, then refresh the page. Your website will be live at:
   `https://<your-username>.github.io/<your-repo-name>/`

---

### Method 2: Using GitHub Actions

1. In **Settings** → **Pages**:
   - **Source**: Select `GitHub Actions`
2. The included `.github/workflows/deploy.yml` workflow will automatically build and publish the app directly.

---

## ✨ Features

- **Trilingual Support**: English, অসমীয়া (Assamese), and বাংলা (Bengali).
- **Assam Cultural Aesthetic**: Authentic Gamosa border motifs, Muga silk gold (`#E0A526`), and deep tea garden green (`#166534`).
- **Interactive Question Types**:
  - Single & multi-select choices with quick touch targets.
  - Open-ended responses with voice recording & transcript.
  - Interactive Assam district and premier college selectors.
- **Admin Dashboard**:
  - Assam district heat map across 35 districts.
  - Question analytics, rupee pricing histograms, and CSV data export.

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (outputs to both dist/ and docs/)
npm run build
```
