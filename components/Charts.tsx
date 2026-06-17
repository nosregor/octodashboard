import { useState, useEffect } from 'react';
import { buildChart, langColors, backgroundColor, borderColor } from '../utils';
import type { LangStat, GitHubRepo } from '../types/github';

interface ChartsProps {
  langData: LangStat[];
  repoData: GitHubRepo[];
}

const Charts = ({ langData, repoData }: ChartsProps) => {
  const [langChartData, setLangChartData] = useState<number[] | null>(null);
  const initLangChart = () => {
    const ctx = document.getElementById('langChart') as HTMLCanvasElement;
    const labels = langData.map(lang => lang.label);
    const data = langData.map(lang => lang.value);

    setLangChartData(data);

    if (data.length > 0) {
      const bgColor = langData.map(
        ({ color }) =>
          `#${color.length > 4 ? color.slice(1) : color.slice(1).repeat(2)}B3`
      );
      const bdColor = langData.map(lang => `${lang.color}`);
      buildChart({ ctx, chartType: 'pie', labels, data, backgroundColor: bgColor, borderColor: bdColor, axes: false, legend: true });
    }
  };

  const [starChartData, setStarChartData] = useState<number[] | null>(null);
  const initStarChart = () => {
    const ctx = document.getElementById('starChart') as HTMLCanvasElement;
    const LIMIT = 5;
    const sortProperty = 'stargazers_count';
    const mostStarredRepos = repoData
      .filter(repo => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map(repo => repo.name);
    const data = mostStarredRepos.map(repo => repo[sortProperty]);

    setStarChartData(data);

    if (data.length > 0) {
      buildChart({ ctx, chartType: 'bar', labels, data, backgroundColor, borderColor, axes: true, legend: false });
    }
  };

  const [thirdChartData, setThirdChartData] = useState<number[] | null>(null);
  const initThirdChart = () => {
    const ctx = document.getElementById('thirdChart') as HTMLCanvasElement;
    const filteredRepos = repoData.filter(repo => !repo.fork && repo.stargazers_count > 0);
    const uniqueLangs = new Set(filteredRepos.map(repo => repo.language));
    const labels = Array.from(uniqueLangs.values()).filter((l): l is string => l !== null);
    const data = labels.map(lang => {
      const repos = filteredRepos.filter(repo => repo.language === lang);
      return repos.map(r => r.stargazers_count).reduce((a, b) => a + b, 0);
    });

    setThirdChartData(data);

    if (data.length > 0) {
      const bdColor = labels.map(label => langColors[label]);
      const bgColor = bdColor.map(color => `${color}B3`);
      buildChart({ ctx, chartType: 'doughnut', labels, data, backgroundColor: bgColor, borderColor: bdColor, axes: false, legend: true });
    }
  };

  useEffect(() => {
    if (langData.length && repoData.length) {
      initLangChart();
      initStarChart();
      initThirdChart();
    }
  }, []);

  const chartSize = 300;
  const langChartError = !(langChartData && langChartData.length > 0);
  const starChartError = !(starChartData && starChartData.length > 0);
  const thirdChartError = !(thirdChartData && thirdChartData.length > 0);

  return (
    <section className="py-12 px-20 max-[900px]:py-8 max-[900px]:px-8 max-[400px]:p-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="charts-grid max-w-[1200px] mx-auto -mt-32 grid grid-cols-3 gap-8 max-[900px]:grid-cols-1 max-[900px]:justify-items-center">

          <div className="chart-card bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Top Languages</h2>
            </header>
            <div>
              {langChartError && <p className="text-[#586069]">Nothing to see here!</p>}
              <canvas id="langChart" width={chartSize} height={chartSize} />
            </div>
          </div>

          <div className="chart-card bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Most Starred</h2>
            </header>
            <div>
              {starChartError && <p className="text-[#586069]">Nothing to see here!</p>}
              <canvas id="starChart" width={chartSize} height={chartSize} />
            </div>
          </div>

          <div className="chart-card bg-white max-w-[500px] p-8 rounded shadow-[0_5px_30px_-15px_rgba(0,0,0,0.2)] max-[400px]:px-4">
            <header className="flex justify-between mb-8">
              <h2 className="section-heading text-2xl">Stars per Language</h2>
            </header>
            <div>
              {thirdChartError && <p className="text-[#586069]">Nothing to see here!</p>}
              <canvas id="thirdChart" width={chartSize} height={chartSize} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Charts;
