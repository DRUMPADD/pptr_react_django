import React, { useState } from 'react'
import './search.css'
import { getPermission, searchPermission } from '../../api/requests.api';
import Swal from 'sweetalert2';

function SearchPage() {
  const [search, setSearch] = useState("");
  const [perm, setPerm] = useState([]);
  const [perms, setPerms] = useState([]);
  const [certs, setCerts] = useState([]);

  const handleChange = async(e) => {
    setSearch(String(e.target.value).trim()) 
    try {
      if(search.trim() !== "") {
        console.log(search)
        await searchPermission(search).then(response => { return setPerms(response.data.msg) })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const boxContent = () => {
    if(perm.length) {
      return (
        <div>
          <h2 style={{fontSize: 1.5 + "em", fontWeight: 800, textAlign: 'center'}}>Permiso</h2>
          <div key={perm[0][0]} style={{display: 'flex', gap: 0, margin: 30 + 'px'}}>
            <div className='permission-box'>
              <p className='title-content'>Fecha de solicitud</p>
              <p className='title-content'>Fecha de inicio</p>
              <p className='title-content'>Fecha de cierre</p>
              <p className='title-content'>Folio PPTR:</p>
              <p className='title-content'>Empresa:</p>
              <p className='title-content'>Trabajo:</p>
              <p className='title-content'>Sitio de trabajo:</p>
              <p className='title-content'>Categoría de trabajo:</p>
              <p className='title-content'>Descripción de trabajo:</p>
              <p className='title-content'>Coordinador:</p>
              <p className='title-content'>Responsable de área:</p>
              <p className='title-content'>Responsable de sitio:</p>
              <p className='title-content'>Estado:</p>
            </div>
            <div className='permission-box'>
              <p className='content'><span>{perm[1]}</span></p>
              <p className='content'><span>{perm[2]}</span></p>
              <p className='content'><span>{perm[3]}</span></p>
              <p className='content'><span>{perm[4]}</span></p>
              <p className='content'><span>{perm[5]}</span></p>
              <p className='content'><span>{perm[6]}</span></p>
              <p className='content'><span>{perm[7]}</span></p>
              <p className='content'><span>{perm[8]}</span></p>
              <p className='content'><span>{perm[9]}</span></p>
              <p className='content'><span>{perm[10]}</span></p>
              <p className='content'><span>{perm[11]}</span></p>
              <p className='content'><span>{perm[12]}</span></p>
              <p className='content'><span>{perm[13]}</span></p>
            </div>
          </div>
        </div>
      )
    } 
  }

  const certs_content = () => {
    if(certs.length) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <p style={{fontSize: 1.5 + "em", fontWeight: 800}}>Certificados</p>
          <div style={{display: 'flex', gap: 0, margin: 30 + 'px', alignItems: 'self-start'}}>
            <div className='permission-box'>
              {
                certs.map((certificate, id) => (
                  <p key={id} className='title-content'>
                    {certificate[0]}
                  </p>
                ))
              }
            </div>
            <div className='permission-box'>
              {
                certs.map((certificate, id) => (
                  <p key={id} className='content'>
                    {certificate[2]}
                  </p>
                ))
              }
            </div>
          </div>
        </div>
      )
    }
  }

  const handleClick = async () => {
    try {
      if(search.trim() !== "") {
        const resp = await getPermission(search).then(response => {return response.data})
        setPerm(resp.msg)
        setCerts(resp.certs)
        if(!perms.length) {
          return Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: 'El permiso no existe'
          })
        }
        if(!Array(resp.certs).length) {
          console.log(certs)
          return Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: 'No hay certificados'
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const selectPPTR = async (searchPPTR) => {
    setSearch(searchPPTR)
  }
  return (
    <div className='container'>
      <h1>Sistema Ejecutivo de Registro de PPTR</h1>
      <h1>Buscar permiso</h1>
      <form className='search-form'>
        <div className='search-box' style={{position: 'relative'}}>
          <div style={{'display': 'flex', 'gap': 4 + 'px', width: 100+'%'}}>
            <input type={'text'} className='inp-search' placeholder='Registro' value={search} onChange={handleChange} />
            <button type='button' onClick={handleClick}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </button>
          </div>
          <div style={{position: 'absolute', background: '#77B89F', width: 80 + "%", top: 40+'px', left: 0+'px', overflowX: "hidden"}}>
            { perms.length ?
              perms.filter(pptr => {
                return String(search) && pptr[1].toLowerCase().includes(search.toLowerCase()) && pptr[1].toLowerCase() !== String(search).toLowerCase()
              }).map((pptr) => (
                <p key={pptr[1]} onClick={() => selectPPTR(pptr[1])} className='option-pptr'>{pptr[1]}</p>
              )) : null
            }
          </div>
        </div>
      </form>
      <div style={{display: 'flex', alignItems: 'self-start', margin: 10 + 'px'}}>
        {boxContent()}
        {certs_content()}
      </div>
    </div>
  )
}

export default SearchPage