import Chart from 'chart.js';

const interFont = 'Inter, system, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Arial, sans-serif';

const buildScales = axes => {
  const scales = {
    xAxes: [
      {
        ticks: {
          fontFamily: interFont,
          fontSize: 12,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontFamily: interFont,
          fontSize: 12,
        },
      },
    ],
  };

  return axes ? scales : null;
};

const buildLegend = legend => {
  const leg = {
    position: 'right',
    labels: {
      fontFamily: interFont,
    },
  };
  return legend ? leg : null;
};

const buildChart = config => {
  const { ctx, chartType, labels, data, backgroundColor, borderColor, axes, legend } = config;

  return new Chart(ctx, {
    type: chartType,
    responsive: true,
    maintainAspectRatio: false,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
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
