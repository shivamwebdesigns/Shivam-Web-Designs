'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function PerformanceChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current, 'dark', {
      renderer: 'svg',
    });

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      title: {
        text: 'Core Web Vitals & Speed Benchmark',
        subtext: 'Measured on actual mobile 4G network throttle',
        left: 'left',
        textStyle: {
          color: '#ffffff',
          fontSize: 15,
          fontWeight: 600,
          fontFamily: 'var(--font-sans)',
        },
        subtextStyle: {
          color: '#737373',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(255, 255, 255, 0.04)',
          },
        },
        backgroundColor: '#0d0d0d',
        borderColor: '#262626',
        textStyle: {
          color: '#ffffff',
          fontSize: 12,
        },
        formatter: (params: unknown) => {
          const p = params as Array<{ seriesName: string; value: number; marker: string; name: string }>;
          if (!p || !p.length) return '';
          let res = `<div style="font-weight:600;margin-bottom:4px">${p[0].name}</div>`;
          p.forEach((item) => {
            const unit = item.name.includes('LCP') ? 's' : item.name.includes('Weight') ? 'MB' : '/100';
            res += `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
              <span>${item.marker} ${item.seriesName}</span>
              <span style="font-family:monospace;font-weight:600">${item.value}${unit}</span>
            </div>`;
          });
          return res;
        },
      },
      legend: {
        data: ['SWD Engineered Code', 'Industry Average (CMS/Templates)'],
        top: 36,
        right: 0,
        textStyle: {
          color: '#a3a3a3',
          fontSize: 11,
        },
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '26%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['Lighthouse Score', 'Sub-second LCP (s)', 'Total Page Payload (MB)'],
        axisLine: { lineStyle: { color: '#262626' } },
        axisLabel: {
          color: '#8a8a8a',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
        },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
        axisLabel: { color: '#737373', fontSize: 10 },
      },
      series: [
        {
          name: 'SWD Engineered Code',
          type: 'bar',
          data: [99, 0.6, 0.18],
          itemStyle: {
            color: '#ffffff',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '28%',
        },
        {
          name: 'Industry Average (CMS/Templates)',
          type: 'bar',
          data: [42, 4.2, 5.8],
          itemStyle: {
            color: '#262626',
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: '28%',
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, []);

  return (
    <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 backdrop-blur-md">
      <div ref={chartRef} className="h-72 sm:h-80 w-full" />
    </div>
  );
}
