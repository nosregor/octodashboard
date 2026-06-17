const Footer = () => (
  <footer className="flex justify-center items-center py-8 px-20 text-[#6a737d] text-center font-medium text-sm max-[900px]:px-8 max-[400px]:p-4">
    <div>
      <span>Built with</span>
      <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="p-[5px] hover:underline focus:underline">
        Next.js
      </a>
      &middot;
      <a href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer" className="p-[5px] hover:underline focus:underline">
        Chart.js
      </a>
      &middot;
      <a href="https://github.com/IonicaBizau/node-gh-polyglot" target="_blank" rel="noopener noreferrer" className="p-[5px] hover:underline focus:underline">
        GitHub Polyglot
      </a>
      &middot;
      <a href="https://www.styled-components.com/" target="_blank" rel="noopener noreferrer" className="p-[5px] hover:underline focus:underline">
        Styled Components
      </a>
      &middot;
      <a href="https://github.com/joshwcomeau/react-flip-move" target="_blank" rel="noopener noreferrer" className="p-[5px] hover:underline focus:underline">
        React Flip Move
      </a>
      and more!
    </div>
  </footer>
);

export default Footer;
