const linkClass = 'p-[5px] text-[#0070f3] hover:underline focus:underline';

const Footer = () => (
  <footer className="flex justify-center items-center py-8 px-20 text-[#6a737d] text-center font-medium text-sm max-[900px]:px-8 max-[400px]:p-4 print:hidden">
    <div>
      <span>Built with</span>
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Next.js
      </a>
      &middot;
      <a href="https://typescriptlang.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        TypeScript
      </a>
      &middot;
      <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Tailwind CSS
      </a>
      &middot;
      <a href="https://bun.sh/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Bun
      </a>
      &middot;
      <a href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
        Chart.js
      </a>
      &middot;
      <a href="https://github.com/IonicaBizau/node-gh-polyglot" target="_blank" rel="noopener noreferrer" className={linkClass}>
        GitHub Polyglot
      </a>
      &middot;
      <a href="https://github.com/joshwcomeau/react-flip-move" target="_blank" rel="noopener noreferrer" className={linkClass}>
        React Flip Move
      </a>
      and more!
    </div>
  </footer>
);

export default Footer;
