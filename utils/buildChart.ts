import Chart from 'chart.js';

const interFont =
  'Inter, system, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Arial, sans-serif';

interface BuildChartConfig {
  ctx: HTMLCanvasElement;
  chartType: Chart.ChartType;
  labels: string[];
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  axes: boolean;
  legend: boolean;
}

const buildScales = (axes: boolean): Chart.ChartScales | undefined => {
  if (!axes) return undefined;
  return {
    xAxes: [{ ticks: { fontFamily: interFont, fontSize: 12 } }],
    yAxes: [
      { ticks: { beginAtZero: true, fontFamily: interFont, fontSize: 12 } },
    ],
  };
};

const buildLegend = (legend: boolean): Chart.ChartLegendOptions | undefined => {
  if (!legend) return undefined;
  return {
    position: 'right',
    labels: { fontFamily: interFont },
  };
};

const buildChart = (config: BuildChartConfig): Chart => {
  const {
    ctx,
    chartType,
    labels,
    data,
    backgroundColor,
    borderColor,
    axes,
    legend,
  } = config;

  return new Chart(ctx, {
    type: chartType,
    data: {
      labels,
      datasets: [{ data, backgroundColor, borderColor, borderWidth: 1 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: buildScales(axes),
      legend: buildLegend(legend),
      tooltips: {
        titleFontFamily: interFont,
        bodyFontFamily: interFont,
        cornerRadius: 3,
      },
    },
  });
};

export default buildChart;
