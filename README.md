# Graduation Netflix Theme

A Netflix-themed web application designed as a graduation surprise.

## 1. Git Clone

```bash
git clone <repository-url>
cd grad-surprise-netflix-theme
```

## 2. Installation & Running

### Requirements
- Node.js (v18 or higher recommended)

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
# or
npm start
```

---

## 3. Adding Images and Videos

### Media Location
- Place local media assets in the `public/` directory (e.g., `public/images/` or `public/videos/`).
- Refer to local files in `src/data/storyData.json` using relative public paths (e.g., `"/images/my-photo.jpg"` or `"/videos/my-video.mp4"`).

---

## ⚠️ Warning: Video Storage Limits

> [!WARNING]
> Hosting providers (such as Vercel, Netlify, or GitHub Pages) have strict bandwidth and file size limits for static assets. Uploading large video files directly to the repository or `public/` folder may cause slow page load times, deployment failures, or git storage quotas being exceeded.

### Recommended Alternatives
- **YouTube (Unlisted):** Upload videos to YouTube as **Unlisted**, and add the video ID to `youtubeId` in `src/data/storyData.json`.
- **Cloud Video Hosting:** Store videos on services like Cloudinary, AWS S3, or Vimeo, and use the direct video URL in `storyData.json`.
