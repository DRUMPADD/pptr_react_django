import React, { useEffect, useState } from 'react'
// import { Chart } from 'chart.js'
import { getCompany_p_perm } from '../../api/requests.api';
// import useChart from '../../services/hooks/useChart';
export default function ChartCompanyWPerm() {
    // const myCanvas = useRef(null);
    // const make_chart = useChart;
    const [comps, setComps] = useState([])
    // var mychart;
    async function company_p_permission() {
      let labels_ = [], data_ = [], backsRGB = [];
      await getCompany_p_perm().then(resp => {
        setComps(resp.data.companies)
        resp.data?.companies?.foreach(r => {
          const red_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          const green_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          const blue_ = `${Math.floor(Math.random() * (255 - 1) + 1)}`;
          backsRGB.push(`rgba(${red_}, ${green_}, ${blue_}, 1`)
          labels_.push(r.empresa__id_emp)
          data_.push(r.cantidad)
        })
      })
      try {
        // make_chart({chartContext: myCanvas, chartType: 'line', labels: labels_, dataSets: [
        //   {
        //     label: 'Empresas',
        //     data: data_,
        //     backgroundColor: backsRGB,
        //     datalabels: {
        //       font: {
        //         size: 16,
        //         family: 'Nunito'
        //       }
        //     },
        //     fill: true,
        //     borderColor: backsRGB,
        //     tension: 0.9
        //   }
        // ], text: 'Empresas ligadas a permisos', plugins: null})
        // new Chart(myCanvas.current, {
        //   type: 'line',
        //   data: {
        //     labels: labels_,
        //     datasets: [
        //       {
        //         label: 'Empresas',
        //         data: data_,
        //         backgroundColor: backsRGB,
        //         datalabels: {
        //           font: {
        //             size: 16,
        //             family: 'Nunito'
        //           }
        //         },
        //         fill: true,
        //         borderColor: backsRGB,
        //         tension: 0.9
        //       }
        //     ]
        //   },
        //   options: {
        //     plugins: {
        //       title: {
        //         display: true,
        //         text: 'Empresas ligadas a permisos',
        //         font: {
        //           size: 22,
        //           weight: 'bolder',
        //           family: 'Nunito'
        //         },
        //         color: 'black'
        //       },
        //       legend: {
        //         labels: {
        //           font: {
        //             size: 14,
        //             weight: 'bold'
        //           }
        //         }
        //       },
              
        //     },
        //     scales: {
        //       x: {
        //           display: false,
        //       },
        //       x1: {
        //           offset: true,
        //           gridLines: {
        //               display: false
        //           }
        //       }
        //     }
        //   },
        // })
      } catch (error) {
        return;
      }
    }
    useEffect(() => {
        company_p_permission()
    }, [])
  return (
    <div className='table-'>
      <h2>Empresas con permisos</h2>
      <div className='container-table'>
        <table className='table-comps' style={{width: 100 + "%"}}>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Empresa</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {
              comps.map((comp, id) => (
                <tr key={id}>
                  {/* <td>{comp.empresa__id_emp}</td> */}
                  <td>{comp.empresa__empresa}</td>
                  <td>{comp.cantidad}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {/* <div style={{width: 40 + "%"}}>
          <canvas ref={myCanvas} width={'600'} height={'400'}></canvas>
        </div> */}

      </div>
    </div>
  )
}