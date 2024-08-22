import React, { useEffect, useRef, useState } from 'react';
import { countCategoriesPId } from '../../api/requests.api';
import '../css/table.css';
import ChartJS from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import useChart from '../../hooks/useChart';
function ChartCategoriesPId() {
    const [categories, setCategories] = useState([]);
    const chartjs = useRef(null);
    // var mychart;
    // const make_chart = useChart;
    async function categories_per_id () {
        let catsID = [], cQuant = [], backsRGB = [];
        await countCategoriesPId().then(resp => {
            if(resp.data.categories) {
                setCategories(resp.data.categories)
                resp.data?.categories?.map( c => {
                    catsID.push(c.work_cat);
                    cQuant.push(c.cantidad);
                    const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    return backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${parseFloat(Math.random() + .5).toPrecision(2)})`)
                })
            }
        });
        try {
            var chart = ChartJS.getChart(chartjs.current);
            if(chart) {
                chart.destroy()
            }
            // make_chart({chartContext: chartjs, chartType: 'bar', labels: catsID, dataSets: [
            //     {
            //         data: cQuant,
            //         backgroundColor: backsRGB,
            //         datalabels: {
            //             color: '#000',
            //             font: {
            //                 family: 'Nunito',
            //                 size: 24
            //             }
            //         },
            //     },
            // ], text: 'Categorias', plugins: [{beforeInit: chart => {
            //     let dataset = chart.config.data.datasets[0];
            //     chart.config.data.datasets = chart.config.data.labels.map((l, i) => ({
            //         label: l,
            //         data: [{ x: i + 1, y: dataset.data[i] }],
            //         backgroundColor: dataset.backgroundColor[i],
            //         categoryPercentage: 1
            //     }));
            //     chart.config.data.labels = undefined;
            // },  beforeLayout: chart => chart.options.scales.x1.labels = chart.config.data.datasets.filter((ds, i) => !chart.getDatasetMeta(i).hidden).map(ds => ds.label)}, ChartDataLabels]})
            new ChartJS(chartjs.current, {
                type: 'bar',
                data: {
                    labels: catsID,
                    datasets: [
                        {
                            data: cQuant,
                            backgroundColor: backsRGB,
                            datalabels: {
                                color: '#000',
                                font: {
                                    family: 'Nunito',
                                    size: 24
                                }
                            },
                        },
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRadio: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            }
                        }]
                    },
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
                            text: 'Categorías',
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
                            display: '',
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
                            anchor: 'center',
                            align: 'center',
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
                                    backgroundColor: 'black',
                                    borderColor: 'black'
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                title: () => undefined
                            }
                        }
                    },
                    // scales: {
                    //     x: {
                    //         display: false,
                    //     },
                    //     x1: {
                    //         offset: true,
                    //         gridLines: {
                    //             display: false
                    //         }
                    //     }
                    // }
                },
                plugins: [ ChartDataLabels],
            })
        } catch (error) {
            return;
        }
    }
    useEffect(() => {
        categories_per_id();
    }, [])
    return (
        <div className='canvas-content'>
            <div className='chart'>
                <canvas ref={chartjs} id='categories_p_id'></canvas>
            </div>
            <div className='container-table'>
                <table className='table-comps' style={{width: 100 + "%"}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Categoría</th>
                            <th>Cantidad</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((category, id) => (
                                <tr key={id}>
                                    <td>{category.work_cat}</td>
                                    <td>{category.work_cat__categoria}</td>
                                    <td>{category.cantidad}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ChartCategoriesPId;

// Crear tabla empresa, región, total de estados de permisos, 
// Expandir especificando cantidad de estados (ejemplo: 20 abiertos, 10 terminados) y cuántos tienen categoría A o B