# Quick Start - Localhost Development

Get the site running on localhost in 3 steps:

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

## 3. Open Browser

Navigate to: **http://localhost:3000**

---

## Notes

- **Logo**: The site will work without the logo file. The wordmark "Aethon" will display. Add your logo later to `/public/aethon-logo.svg`
- **Environment Variables**: Not required for localhost. The site uses `http://localhost:3000` as default.
- **Placeholder Media**: The site uses CSS placeholders for images/videos until you add real assets.

## Troubleshooting

If you see errors:

1. **Port 3000 in use?** Next.js will automatically use the next available port (3001, 3002, etc.)
2. **Module errors?** Delete `node_modules` and `.next` folder, then run `npm install` again
3. **Logo 404 errors?** This is normal - the logo gracefully hides if the file doesn't exist

## Next Steps

Once running, you can:

- Add your logo to `/public/aethon-logo.svg`
- Replace placeholder content in `/data/` files
- Add real media files to `/public/placeholders/`
