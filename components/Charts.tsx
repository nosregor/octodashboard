import { useEffect } from 'react';
import { buildChart, langColors, backgroundColor, borderColor } from '../utils';
import type { LangStat, GitHubRepo } from '../types/github';

interface ChartsProps {
  langData: LangStat[];
  repoData: GitHubRepo[];
}

const Charts = ({ langData, repoData }: ChartsProps) => {
  const langValues = langData.map((lang) => lang.value);

  const mostStarredRepos = repoData
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  const filteredRepos = repoData.filter(
    (repo) => !repo.fork && repo.stargazers_count > 0,
  );
  const uniqueLangs = Array.from(
    new Set(filteredRepos.map((repo) => repo.language)),
  ).filter((l): l is string => l !== null);
  const starsPerLanguage = uniqueLangs.map((lang) =>
    filteredRepos
      .filter((repo) => repo.language === lang)
      .reduce((sum, repo) => sum + repo.stargazers_count, 0),
  );

  const initLangChart = () => {
    if (langValues.length === 0) return;

    const ctx = document.getElementById('langChart') as HTMLCanvasElement;
    const labels = langData.map((lang) => lang.label);
    const bgColor = langData.map(
      ({ color }) =>
        `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`,
    );
    const bdColor = langData.map((lang) => `${lang.color}`);
    buildChart({
      ctx,
      chartType: 'pie',
      labels,
      data: langValues,
      backgroundColor: bgColor,
      borderColor: bdColor,
      axes: false,
      legend: true,
    });
  };

  const initStarChart = () => {
    if (mostStarredRepos.length === 0) return;

    const ctx = document.getElementById('starChart') as HTMLCanvasElement;
    const labels = mostStarredRepos.map((repo) => repo.name);
    const data = mostStarredRepos.map((repo) => repo.stargazers_count);
    buildChart({
      ctx,
      chartType: 'bar',
      labels,
      data,
      backgroundColor,
      borderColor,
      axes: true,
      legend: false,
    });
  };

  const initThirdChart = () => {
    if (starsPerLanguage.length === 0) return;

    const ctx = document.getElementById('thirdChart') as HTMLCanvasElement;
    const bdColor = uniqueLangs.map((label) => langColors[label]);
    const bgColor = bdColor.map((color) => `${color}B3`);
    buildChart({
      ctx,
      chartType: 'doughnut',
      labels: uniqueLangs,
      data: starsPerLanguage,
      backgroundColor: bgColor,
      borderColor: bdColor,
      axes: false,
      legend: true,
    });
  };

  useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      initStarChart();
      initThirdChart();
    }
  }, []);

  const chartSize = 300;
  const langChartError = langValues.length === 0;
  const starChartError = mostStarredRepos.length === 0;
  const thirdChartError = starsPerLanguage.length === 0;

  return (
    <section className="py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-[1200px] mx-auto -mt-32 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 max-[900px]:justify-items-center">
          <div className="bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Top Languages</h2>
            </header>
            <div>
              {langChartError && (
                <p className="text-[#586069]">Nothing to see here!</p>
              )}
              <canvas id="langChart" width={chartSize} height={chartSize} />
            </div>
          </div>

          <div className="bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Most Starred</h2>
            </header>
            <div>
              {starChartError && (
                <p className="text-[#586069]">Nothing to see here!</p>
              )}
              <canvas id="starChart" width={chartSize} height={chartSize} />
            </div>
          </div>

          <div className="bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Stars per Language</h2>
            </header>
            <div>
              {thirdChartError && (
                <p className="text-[#586069]">Nothing to see here!</p>
              )}
              <canvas id="thirdChart" width={chartSize} height={chartSize} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Charts;
