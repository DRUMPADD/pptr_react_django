import React, { useEffect, useState } from 'react'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faSearch} from '@fortawesome/free-solid-svg-icons'
import './register.css'
import { getRegions, getRegion, getWorkers, getCompanies, getSedes, register, getCategories } from '../../api/requests.api'
import PPTRForm from '../../components/PPTRForm';
import { countCategoriesPId } from '../../api/requests.api';
import Swal from 'sweetalert2'

function RegisterPage() {
  const [regions, setRegions] = useState([])
  const [workers, setWorkers] = useState([])
  const [sedes, setSedes] = useState([])
  const [cats, setCats] = useState([])
  const [companies, setCompanies] = useState([])
  const [inputSearch, setinputSearch] = useState("")
  const [form, setForm] = useState({
      region: "",
      fecha_sol: "",
      fecha_ini: "",
      fecha_cie: "",
      empresa: "",
      sup_comp: "",
      clase_perm: null,
      folio_pptr: "",
      tr: "",
      sit_tr: "",
      cat_tr: "",
      desc_tr: "",
      enc_sit: "",
      enc_area: "",
      coor: "",
      certifs: [],
      // inst: ""
  })

  function validate() {
    return form.region !== "" && form.fecha_sol !== "" && form.fecha_ini !== "" && form.fecha_cie !== "" && form.empresa !== "" && form.sup_comp !== "" && form.clase_perm !== "" && form.folio_pptr !== "" && form.enc_sit !== "" && form.enc_area !== ""
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(validate()) {
      try {
          // console.log(form)
          const response = await register(form)
          const d = await response.json();
          if(d.status === "success") {
            setForm({
              region: "",
              fecha_sol: "",
              fecha_ini: "",
              fecha_cie: "",
              empresa: "",
              sup_comp: "",
              clase_perm: null,
              folio_pptr: "",
              tr: "",
              sit_tr: "",
              cat_tr: "",
              desc_tr: "",
              enc_sit: "",
              enc_area: "",
              coor: "",
              certifs: [],
              inst: ""
            })
            setCompanies([])
            setSedes([])
            setRegions([])
            setWorkers([])
  
            Swal.fire({
              title: d.msg,
              icon: d.status,
            })
          } else {
            Swal.fire({
              title: d.title,
              icon: d.status,
              text: d.msg
            })
          }
      } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error al intentar enviar los datos",
            icon: "error"
          })
      }
    } else {
      Swal.fire({
        title: 'Datos incompletos',
        icon: 'warning',
        text: 'Debe llenar todos los datos requeridos',
      })
    }
  }

  const showRegions = async() => {
    try {
      await getRegions().then(response => {return response.data.regions})
    } catch (error) {
      console.log(error)
    }
  }
  const countCategoriesPerId = async() => {
    try {
      await countCategoriesPId().then(response => {return response.data.categories})
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    if(e.target.name === "clase_perm") {
      return showCategories(e.target.value)
    }
  }


  const searchRegion = async(val) => {
    let str = String(val)
    setinputSearch(str)
    if(str.trim() !== "") {
      try {
        await getRegion(str).then(response => {
          if(response.data){
            return setRegions(response.data.regions)
          }
          setRegions([])
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
  
  const showCategories = async(val) => {
    const class_ = String(val)
    if(class_) {
      try {
        await getCategories(class_).then(response => {
          if(response.data) {
            return setCats(response.data.categories)
          }
          setCats([])
        });
      } catch (error) {
        console.log(error)
      }
    }
  }

  const clickRegion = (e) => {
    const reg = String(e.target.innerText).split(" - ")
    setinputSearch(reg[0])
    form.region = reg[1]
    setRegions([])
    showSedes(reg[1])
    showCompanies(reg[1])
    showWorkers(reg[1])
  }

  useEffect(() => {
    showRegions()
    countCategoriesPerId()
  }, [])


  const showCompanies = async (val) => {
    const r = String(val)
    if(r !== ""){
        await getCompanies(r).then(res => {
          if(res.data)
            return setCompanies(res.data.companies)
          setCompanies([])
        })
    }
  }

  const showSedes = async (val) => {
    const r = String(val)
    if(r !== ""){
        await getSedes(r).then(res => {
          if(res.data)
            return setSedes(res.data.sedes)
          setSedes([])
        })
    }
  }

  const showWorkers = async (val) => {
    const r = String(val)
    if(r !== ""){
        await getWorkers(r).then(res => {
          if(res.data)
            return setWorkers(res.data.workers)
          setWorkers([])
        })
    }
  }


  return (
    <div className='container'>
      <h1>Sistema Ejecutivo de Registro de PPTR</h1>
      <h1>Registrar permiso</h1>
      <div>
        <div className='results'>
          <input type="search" value={inputSearch} className='inp-s' onChange={(e) => searchRegion(e.target.value)} placeholder={"Buscar estado"} />
          <div style={{background: 'transparent'}}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className={'states-box'} hidden={regions.length === 0} style={{position: "relative", zIndex: 1}}>
          <div className={'box'} style={{position: "absolute"}}>
            { regions.length ?
              regions.filter(el => {
                  return inputSearch && el.region.toLowerCase().includes(inputSearch.toLowerCase()) && el.region.toLowerCase() !== inputSearch.toLowerCase()
                }
              ).map(reg => (
                <p onClick={clickRegion} key={reg.id_reg}>{reg.region} - {reg.id_reg}</p>
              ))
              : null
            }
          </div>
        </div>
      </div>
      <PPTRForm form={form} handleChange={handleChange} worker={workers} company={companies} handleSubmit={handleSubmit} sede={sedes} cats={cats} />
    </div>
  )
}

export default RegisterPage