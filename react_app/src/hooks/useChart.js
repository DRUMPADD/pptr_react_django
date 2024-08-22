import Chartjs from "chart.js/auto";
import { useEffect } from "react";
function useChart({chartContext, chartType, labels, dataSets, plugins, text}) {
    useEffect(() => {
        const chart = Chartjs.getChart(chartContext.current.id);
        if(chart) {
            chart.destroy();
        }
        new Chartjs(chartContext.current, {
            type: chartType,
            data: {
                labels: labels,
                datasets: dataSets
            },
            options: {
                responsive: true,
                maintainAspectRadio: true,
                elements: {
                    point: 'dash'
                },
                layout: {
                    padding: 10,
                },
                interaction: {
                    intersect: true,
                    mode: 'nearest'
                },
                plugins: {
                    title: {
                        display: true,
                        text: text,
                        padding: {
                            top: 10,
                            bottom: 30
                        },
                        font: {
                            size: 22,
                            family: 'Nunito',
                            weight: 600,
                        },
                        color: '#000'
                    },
                    legend: {
                        labels: {
                            font: {
                                size: 14,
                                weight: 700,
                                family: 'Nunito'
                            },
                            textAlign: 'center',
                            color: '#000'
                        }
                    },
                    datalabels: {
                        display: function(context) {
                            return context.dataset.data[context.dataIndex] > 15;
                        },
                    },
                    tooltip: {
                        callbacks: {
                            title: () => undefined
                        }
                    }
                },
                scales: {
                    x: {
                        display: false,
                    },
                    x1: {
                        offset: true,
                        gridLines: {
                            display: false
                        }
                    }
                }
            },
            plugins: plugins ?? null,
        })
    },)

    return {};
}

export default useChart;