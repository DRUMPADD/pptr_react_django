/* eslint-disable array-callback-return */
import React, { useEffect, useRef } from 'react'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chartjs from "chart.js/auto";
import { countClassesPerType } from '../../api/requests.api';
// import useChart from '../../hooks/useChart';
function ChartClassesPType() {
    const chartjs = useRef(0);
    // const make_chart = useChart;
    async function classes_p_type() {
        let labs = [], classes = [];
        await countClassesPerType().then(resp => {
            return resp.data
        }).then(data => {
            data.classes.map(function (class_) {
                labs.push("Clase " + class_.work_cat__clase)
                classes.push(class_.clases)
            })
        });
        var chart = Chartjs.getChart(chartjs.current.id);
        if(chart) {
            chart.destroy()
        }
        // try {
            // make_chart({ chartContext: chartjs, chartType: 'pie', labels: [labs[0], labs[1]], dataSets: [
            //     {
            //         backgroundColor: ['rgba(203, 102, 134, 0.7)', 'rgba(45, 196, 168, 0.7)'],
            //         data: [classes[0], classes[1]],
            //         datalabels: {
            //             color: '#000',
            //             font: {
            //                 family: 'Nunito',
            //                 size: 24
            //             }
            //         },
            //     }
            // ], text: 'Clases por tipo', plugins: [ChartDataLabels]});
            new Chartjs(chartjs.current, {
                type: 'pie',
                data: {
                    labels: [labs[0], labs[1]],
                    datasets: 
                    [{
                        backgroundColor: ['rgba(203, 102, 134, 0.7)', 'rgba(45, 196, 168, 0.7)'],
                        data: [classes[0], classes[1]],
                        datalabels: {
                            color: '#000',
                            font: {
                                family: 'Nunito',
                                size: 24
                            }
                        },
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRadio: true,
                    elements: {
                        point: 'dash'
                    },
                    layout: {
                        padding: 50,
                    },
                    interaction: {
                        intersect: true,
                        mode: 'nearest'
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Clases por tipo',
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                            font: {
                                size: 18,
                                family: 'Nunito',
                                weight: 700,
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
                                boxHeight: 20,
                                boxWidth: 20,
                                useBorderRadius: true,
                                borderRadius: 10,
                                textAlign: 'center',
                                color: '#000'
                            }
                        },
                        datalabels: {
                            // display: function(context) {
                            //     return context.dataset.data[context.dataIndex] > 15;
                            // },
                            labels: {
                                title: {
                                    font: {
                                        size: 16,
                                        family: 'Nunito',
                                        weight: 800
                                    },
                                    textAlign: 'center',
                                    color: 'rgb(255, 255, 255)',
                                    borderRadius: 100,
                                    backgroundColor: '#000',
                                    borderColor: '#000'
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                title: () => undefined
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels],
            })
        // } catch (error) {
        //     console.log(error)
        //     return
        // }
    }
    useEffect(() => {
        classes_p_type()
        }
    , [chartjs])
    return (
        <div className='chart'>
            <canvas ref={chartjs} id='classes_p_type' width="400" height={'400'}></canvas>
        </div>
    )
}

export default ChartClassesPType;