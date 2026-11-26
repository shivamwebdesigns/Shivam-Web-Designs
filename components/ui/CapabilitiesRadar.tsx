'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export function CapabilitiesRadar() {
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
        text: 'Studio Engineering Matrix',
        subtext: 'Obsessive technical benchmarks',
        left: 'center',
        textStyle: {
          color: '#ffffff',
          fontSize: 14,
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
        backgroundColor: '#0d0d0d',
        borderColor: '#262626',
        textStyle: { color: '#ffffff' },
      },
      radar: {
        indicator: [
          { name: 'UI/UX Architecture', max: 100 },
          { name: 'Next.js & Frontend', max: 100 },
          { name: 'Sub-second Speed', max: 100 },
          { name: '3D Spatial Craft', max: 100 },
          { name: 'Conversion Optimization', max: 100 },
        ],
        shape: 'polygon',
        splitNumber: 4,
        axisName: {
          color: '#a3a3a3',
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.08)',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(255, 255, 255, 0.01)', 'rgba(255, 255, 255, 0.03)'],
          },
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      series: [
        {
          name: 'SWD Competency',
          type: 'radar',
          data: [
            {
              value: [98, 100, 100, 95, 96],
              name: 'ShivamWebDesigns Benchmark',
              itemStyle: {
                color: '#ffffff',
              },
              lineStyle: {
                width: 2,
                color: '#ffffff',
              },
              areaStyle: {
                color: 'rgba(255, 255, 255, 0.12)',
              },
            },
          ],
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
    <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4 sm:p-6 backdrop-blur-md">
      <div ref={chartRef} className="h-64 sm:h-72 w-full" />
    </div>
  );
}
