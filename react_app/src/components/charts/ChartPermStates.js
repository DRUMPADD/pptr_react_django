import React, { useRef } from 'react'
import { getPermissions } from '../../api/requests.api';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartJS from 'chart.js/auto'
// import useChart from '../../hooks/useChart';
export default function ChartPermStates() {
    const mychart = useRef(null);
    // const make_chart = useChart;
    async function permissions() {
        let p_open = 0, p_close = 0, p_cancel = 0, p_finished = 0, backsRGB = [];
        const alpha = parseFloat(Math.random() + .5).toPrecision(2);
        // let perms = [];
        await getPermissions().then(res => {
            if(res.data) {
                for(let i = 0; i < 4; i++) {
                    if(res.data.permissions[i]?.id_e === 1) {
                        p_open = res.data.permissions[i].q_status
                    }
                    if(res.data.permissions[i]?.id_e === 2) {
                        p_close = res.data.permissions[i].q_status
                    }
                    if(res.data.permissions[i]?.id_e === 3) {
                        p_cancel = res.data.permissions[i].q_status
                    }
                    if(res.data.permissions[i]?.id_e === 4) {
                        p_finished = res.data.permissions[i].q_status
                    }
                    const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${alpha})`);
                }
                // res.data?.permissions?.forEach(el => {
                // })
            }
        })
        try {
            var chart = ChartJS.getChart(mychart.current);
            if(chart) {
                chart.destroy()
            }
            // console.log(p_open, p_cancel, p_close, p_finished)
            // console.log(backsRGB)
            // make_chart({ chartContext: chart, chartType: 'doughnut', labels: ['Abiertos', 'Cerrados', 'Cancelados', 'Terminados'], dataSets: [
            //     {
            //         data: [p_open, p_close, p_cancel, p_finished],
            //         backgroundColor: backsRGB,
            //         datalabels: {
            //             color: '#000',
            //             font: {
            //                 family: 'Nunito',
            //                 size: 20
            //             }
            //         },
            //     },
            // ], text: 'Estados de permisos', plugins: [ChartDataLabels]})
            new ChartJS(mychart.current, {
                type: 'doughnut',
                data: {
                    labels: ['Abiertos', 'Cerrados', 'Cancelados', 'Terminados'],
                    datasets: [
                        {
                            data: [p_open, p_close, p_cancel, p_finished],
                            backgroundColor: backsRGB,
                            datalabels: {
                                color: '#000',
                                font: {
                                    family: 'Nunito',
                                    size: 20
                                }
                            },
                        },
                    ]
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
                    circumference: 180,
                    rotation: 270,
                    plugins: {
                        // customCanvasBackgroundColor: {
                        //     color: 'light',
                        // },
                        title: {
                            display: true,
                            text: 'Estados de permisos',
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                            font: {
                                size: 18,
                                family: 'Nunito',
                                weight: 600
                            },
                            color: "#000"
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 16,
                                    weight: 'bold',
                                    family: 'Nunito'
                                },
                                textAlign: 'center',
                            }
                        },
                        datalabels: {
                            backgroundColor: function(context) {
                                return context.dataset.backgroundColor;
                            },
                            borderColor: 'white',
                            borderRadius: 25,
                            borderWidth: 2,
                            
                            labels: {
                                title: {
                                    font: {
                                        size: 20,
                                        weight: 'bold',
                                        family: 'Nunito'
                                    },
                                    // color: parseFloat(alpha) > .7 ? '#fff' : '#000'
                                    color: 'rgb(255, 255, 255)',
                                    borderRadius: 100,
                                    backgroundColor: '#000',
                                    borderColor: '#000'
                                },
                            },
                            padding: 6,
                            formatter: Math.round,
                            display: function(context) {
                                var dataset = context.dataset;
                                var value = dataset.data[context.dataIndex];
                                return value;
                            },
                        },
                    },
                },
                plugins: [ChartDataLabels],
            })
            // return () => canvas.destroy();
        } catch (error) {
            console.log(error)
            return
        }
    }
    permissions()
    return (
        <div className='chart'>
            <canvas ref={mychart} id='perm_states'></canvas>
        </div>
    )
}