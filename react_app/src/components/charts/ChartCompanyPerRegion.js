import React, { useEffect, useRef } from 'react'
import { getCompany_p_region } from '../../api/requests.api';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import useChart from '../../hooks/useChart';
export default function ChartCompanyPerRegion() {
    const mycanvas = useRef(null);
    // const make_chart = useChart;
    async function countCompanies () {
        let comps = [], labels_ = [], backsRGB = [];
        await getCompany_p_region().then(resp => {
            if(resp.data) {
                resp.data?.companies.map(r => {
                    labels_.push(r.region__region);
                    comps.push(r.cantidad);
                    const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
                    return backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, ${.7}`);
                })
            }
        })
        try {
            var chart = Chart.getChart(mycanvas.current.id);
            if(chart) {
                chart.destroy()
            }
            // make_chart({ chartContext: mycanvas, chartType: 'doughnut', labels: labels_, dataSets: [{
            //     data: comps,
            //     backgroundColor: backsRGB,
            // }], text: 'Empresas por región', plugins: [ChartDataLabels]})
            new Chart(mycanvas.current, {
                type: 'doughnut',
                data: {
                    labels: labels_,
                    datasets: [{
                        data: comps,
                        backgroundColor: backsRGB,
                    }]
                },
                options: {
                    layout: {
                        padding: 50,
                    },
                    plugins: {
                        title: {
                            display: true,
                            font: {
                                size: 18,
                                family: 'Nunito'
                            },
                            color: '#000000',
                            text: 'Empresas por región'
                        },
                        legend: {
                            labels: {
                                font: {
                                    size: 16,
                                    weight: 'bold',
                                    family: 'Nunito'
                                },
                                boxHeight: 20,
                                boxWidth: 20,
                                useBorderRadius: true,
                                borderRadius: 50,
                                textAlign: 'center'
                            }
                        },
                        datalabels: {
                            labels: {
                                title: {
                                    font: {
                                        size: 20,
                                        family: 'Nunito',
                                        weight: 'bold'
                                    },
                                    color: 'rgb(255, 255, 255)',
                                    borderRadius: 50,
                                    backgroundColor: 'black',
                                    borderColor: 'black'
                                }
                            }
                        }
                    }
                },
                plugins: [ChartDataLabels],
            })
        } catch (error) {
            console.log(error)
            return
        }
    }
    useEffect(() => {
        countCompanies()
    }, [])
  return (
    <div className='chart'>
        <canvas ref={mycanvas} id='company_p_region' width={'400'} height={'400'}></canvas>
    </div>
  )
}