import React, { useEffect } from 'react'
import './styles.css';
// import ChartJS from 'chart.js/auto'
// import { getPermissions } from '../api/requests.api';
import ChartCategoriesPId from '../../components/charts/ChartCategoriesPId';
import ChartClassesPType from '../../components/charts/ChartClassesPType';
import ChartCompanyPerRegion from '../../components/charts/ChartCompanyPerRegion';
import ChartPermStates from '../../components/charts/ChartPermStates';
import ChartCompanyWPerm from '../../components/charts/ChartCompanyWPerm';
// import ChartDataLabels from 'chartjs-plugin-datalabels'
function StadisticsPage() {  
    // const chart = useRef();
    useEffect(() => {
    //     let p_open = 0, p_close = 0, p_cancel = 0, p_finished = 0;
    //     var canvas;
    //     async function permissions() {
    //         try {
    //             const perms = await getPermissions().then(res => {return res.data.permissions})
    //             perms.forEach(el => {
    //                 el[14] === 1 ? p_open += 1 : el[14] === 2 ? p_close += 1 : el[14] === 3 ? p_cancel += 1 : p_finished += 1;
    //             })
    //             try {
    //                 if(!p_open || !p_close || !p_cancel || !p_finished) {
    //                     return () => canvas.destroy();
    //                 }
    //                 canvas = new ChartJS(chart.current.getContext('2d'), {
    //                     type: 'doughnut',
    //                     data: {
    //                         labels: ['Abiertos', 'Cerrados', 'Cancelados', 'Terminados'],
    //                         datasets: [
    //                             {
    //                                 data: [p_open, p_close, p_cancel, p_finished],
    //                                 backgroundColor: ['green','red', 'yellow', 'black'],
    //                                 datalabels: {
    //                                     color: '#000',
    //                                     font: {
    //                                         family: 'Nunito',
    //                                         size: 20
    //                                     }
    //                                 },
    //                             },
    //                         ]
    //                     },
    //                     options: {
    //                         responsive: true,
    //                         maintainAspectRadio: true,
    //                         elements: {
    //                             point: 'dash'
    //                         },
    //                         layout: {
    //                             padding: 10,
    //                         },
    //                         plugins: {
    //                             title: {
    //                                 display: true,
    //                                 text: 'Permisos',
    //                                 padding: {
    //                                     top: 10,
    //                                     bottom: 30
    //                                 },
    //                                 font: {
    //                                     size: 28,
    //                                     family: 'Nunito',
    //                                     weight: 600
    //                                 }
    //                             },
    //                             legend: {
    //                                 labels: {
    //                                     font: {
    //                                         size: 15,
    //                                         weight: 700,
    //                                         family: 'Nunito'
    //                                     },
    //                                     textAlign: 'center',
    //                                 }
    //                             },
    //                             datalabels: {
    //                                 color: 'blue',
    //                                 labels: {
    //                                     title: {
    //                                         font: {
    //                                             weight: 'bold'
    //                                         }
    //                                     },
    //                                     value: {
    //                                         color: 'green'
    //                                     }
    //                                 }
    //                             }
    //                         },
    //                     },
    //                     plugins: [ChartDataLabels],
    //                 })
    //                 return () => canvas.destroy();
    //             } catch (error) {
    //                 console.log(error)
    //                 return
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     permissions()
    }, [])
    return (
        <div className='container content-charts'>
            <h1>Sistema Ejecutivo de Registro de PPTR</h1>
            <h1>Estadísticas</h1>
            <div className='canvas-content'>
                <ChartClassesPType />
                <ChartCompanyPerRegion />
            </div>
            <div className='canvas-content'>
                <ChartCategoriesPId />
            </div>
            <div className='canvas-content'>
                <ChartPermStates />
                <ChartCompanyWPerm />
            </div>
            {/* <div className='canvas-content'>
            </div> */}
        </div>
    )
}

export default StadisticsPage