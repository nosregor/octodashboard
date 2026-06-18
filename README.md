# OctoDashboard

A nicer look at your GitHub Profile! With charts!

![demo](https://raw.githubusercontent.com/nosregor/octodashboard/master/public/static/og.png)

Built with:

- [Next.js 16](https://nextjs.org/)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Bun](https://bun.sh)
- [GitHub Polyglot](https://github.com/IonicaBizau/node-gh-polyglot)
- [Chart.js](https://www.chartjs.org/)
- [React Flip Move](https://github.com/joshwcomeau/react-flip-move)

## Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Fire up the development server:
   ```bash
   bun run dev
   ```

## Deployment

This project is optimized for deployment on **Vercel** using native Bun runtime detection.

To deploy from your terminal:

1. Link your project to Vercel:
   ```bash
   bunx vercel link
   ```
2. Deploy to production:
   ```bash
   bunx vercel deploy --prod
   ```
