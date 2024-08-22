import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencil} from '@fortawesome/free-solid-svg-icons'
import './css/radioInputs.css'
import {certificates} from '../api/certificates.api'
function PPTRForm({handleSubmit, handleChange, form, worker = [], company = [], sede = [], cats = []}) {
    const [showCat, setShowCat] = useState(false);
    const [showEncS, setShowEncS] = useState(false);
    const [showEncA, setShowEncA] = useState(false);
    const [showCoor, setShowCoor] = useState(false);
    const [showCompany, setShowCompany] = useState(false);
    const [cert_select, setCertSelect] = useState(false)
    const form_ref = useRef(null);
    
    
    function focusCat () {
        setShowCat(true)
    }
    function selectCat (e) {
        let str = String(e.target.innerText)
        form.cat_tr = str;
        setShowCat(false)
    }
    
    function focusCompany () {
        setShowCompany(true)
    }
    function selectCompany (e) {
        let str = String(e.target.innerText)
        form.empresa = str;
        setShowCompany(false)
    }

    function focusEncS () {
        setShowEncS(true)
    }
    function selectEncS (e) {
        let str = String(e.target.innerText)
        form.enc_sit = str;
        setShowEncS(false)
    }

    function focusEncA (e) {
        setShowEncA(true)
    }
    function selectEncA (e) {
        let str = String(e.target.innerText)
        form.enc_area = str;
        setShowEncA(false)
    }

    function focusCoor () {
        setShowCoor(true)
    }
    function selectCoor (e) {
        let str = String(e.target.innerText)
        form.coor = str;
        setShowCoor(false)
    }

    const [checked, setChecked] = useState([]);
    const [certs, setCerts] = useState([]);
    const getCertificates = async () => {
        try {
            const arr = new Array([]);
            const cers = await certificates().then(res => {return res.data.certs})
            cers.forEach(c => { arr.push({id: c[0], name: c[1], check: false}) })
            setCerts(arr)
            setChecked(new Array(cers.length).fill(false))
        } catch (error) {
            console.log(error)
        }
    }
    const certSelect = (e) => {
        setCertSelect(e.target.checked);
        // const checkFalse = checked.map((status) => {
        //     return status ? !status : status
        // })
        // if(!e.target.checked) {
        //     form.certifs = []
        //     setChecked(checkFalse)
        // }
    }

    const handleCheckBox = (e) => {
        const checkFalse = checked.map((status, index) => {
            return index === e - 1 ? !status: status 
        })
        setChecked(checkFalse)
        if(!form.certifs.includes(e)) {
            form.certifs.push(e)
        } else {
            form.certifs.splice(form.certifs.indexOf(e), 1)
        }
        // console.log(form.certifs)
    }

    function all_certificates() {
        if(certs.length) {
            return (
                <div className={'modal-checkbox' + (!cert_select ? " hidden" : "")}>
                    {
                        certs.filter(position => position.length !== 0).map((certificate, i) => (
                            <div key={certificate.id} className='checkbox-cert'>
                                <input type={"checkbox"} name="certificate" className='radioCert' value={certificate.id} checked={checked[i]} onChange={() => handleCheckBox(certificate.id)} />
                                <label htmlFor={'cert' + certificate.id}>{certificate.name}</label>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
    
    useEffect(() => {
        getCertificates()
    }, [])
    return (
        <form className='form-pptr' onSubmit={handleSubmit}>
            <div className="disp-flex">
                <div>
                    <label className="labels">Fecha de solicitud</label>
                    <div className="input-date">
                        <input onChange={handleChange} type="date" name="fecha_sol" value={form.fecha_sol} className="input-text" placeholder="DD-MM-YYYY" autoComplete='off' />
                    </div>
                </div>
                <div>
                    <label className="labels">Fecha inicio de trabajos</label>
                    <div className="input-date">
                        <input onChange={handleChange} type="date" name="fecha_ini" value={form.fecha_ini} className="input-text" placeholder="DD-MM-YYYY" autoComplete='off' />
                    </div>
                </div>
                <div>
                    <label className="labels">Fecha cierre de trabajos</label>
                    <div className="input-date">
                        <input onChange={handleChange} type="date" style={{WebkitAppearance: "none"}} name="fecha_cie" value={form.fecha_cie} className="input-text date_format" placeholder="DD-MM-YYYY" autoComplete='off' />
                    </div>
                </div>
            </div>
            <div className="disp-flex">
                <div className='inps'>
                    <label className="labels">Empresa</label>
                    <div style={{position: "relative"}}>
                        <div style={{position: "relative", zIndex: "auto"}}>
                            <input onChange={handleChange} type="text" name="empresa" value={form.empresa} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' onFocus={focusCompany} />
                        </div>
                        <div style={{position: "absolute", zIndex: 3, width: 100 + "%", marginTop: -3 + "px", maxHeight: 100 + "px", overflow: "hidden", overflowY: "scroll"}}>
                            {
                                company.length && showCompany ?
                                company.filter(el => {
                                    return form.empresa.toLowerCase() && el[1].toLowerCase().includes(form.empresa.toLowerCase()) && el[0].toLowerCase() !== form.empresa.toLowerCase()
                                }).map(el => (
                                    <p key={el[0]} style={{color: "black", backgroundColor: "#ccc", padding: 4 + "px", cursor: "pointer"}} onClick={selectCompany}>{el[1]} - {el[0]}</p>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
                <div className='inps'>
                    <label className="labels">Supervisor de compañía</label>
                    <div>
                        <input onChange={handleChange} type="text" name="sup_comp" value={form.sup_comp} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' />
                    </div>
                </div>
                <div className='inps'>
                    <label className="labels">Folio PPTR</label>
                    <div>
                        <input onChange={handleChange} type="text" name="folio_pptr" value={form.folio_pptr} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' />
                    </div>
                </div>
            </div>
            <div className='disp-flex'>
                <div className='inps'>
                    <label className="labels">Clase permiso</label>
                    <div>
                        <div className="input-radio">
                            <input onChange={handleChange} type="radio" id="clase_comp_a" name="clase_perm" value={"A"} />
                            <label htmlFor="clase_comp_a">Azul Clase A</label>
                        </div>
                        <div className="input-radio">
                            <input onChange={handleChange} type="radio" id="clase_comp_b" name="clase_perm" value={"B"} />
                            <label htmlFor="clase_comp_b">Azul Clase B</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="disp-flex between">
                <div className='input-desc' style={{width: 50 + "%"}}>
                    <label className="labels">Trabajo</label>
                    <div style={{width: 100 + "%"}}>
                        <input onChange={handleChange} type="text" name="tr" value={form.tr} style={{width: 100 + "%"}} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' />
                    </div>
                </div>
                <div className='input-desc' style={{width: 50 + "%"}}>
                    <label className="labels">Descripción del trabajo</label>
                    <div style={{width: 100 + "%"}}>
                        <input onChange={handleChange} type="text" name="desc_tr" value={form.desc_tr} style={{width: 100 + "%"}} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' />
                        {/* <textarea onChange={handleChange} type="text" name="desc_tr" value={form.desc_tr} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off'></textarea> */}

                    </div>
                </div>
            </div>
            <div className="disp-flex">
                <div className='inps'>
                    <label className="labels">Sitio de trabajo</label>
                    <div>
                        <input onChange={handleChange} type="text" name="sit_tr" value={form.sit_tr} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' />
                    </div>
                </div>
                <div className='inps'>
                    <label className="labels">Categoría del trabajo</label>
                    <div style={{position: 'relative'}}>
                        <div style={{position: "relative", zIndex: "auto"}}>
                            <input onChange={handleChange} type="text" name="cat_tr" value={form.cat_tr} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' onFocus={focusCat} />
                        </div>
                        <div style={{position: "absolute", zIndex: 3, width: 140 + "%", marginTop: -3 + "px", maxHeight: 100 + "px", overflow: "hidden", overflowY: "scroll"}}>
                            {
                                cats.length && showCat ?
                                cats.filter(el => {
                                    return form.cat_tr.toLowerCase() && el[1].toLowerCase().includes(form.cat_tr.toLowerCase()) && el[1].toLowerCase() !== form.cat_tr.toLowerCase() && el[2].toLowerCase().includes(form.clase_perm.toLowerCase())
                                }).map(cat => (
                                    <p key={cat[0]} style={{color: "black", backgroundColor: "#ccc", padding: 4 + "px", cursor: "pointer"}} onClick={selectCat}>{cat[1]} - {cat[0]}</p>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="disp-flex" style={{position: "relative"}}>
                {/* <div className='inps'>
                    <label className="labels">Instalación</label>
                    <div>
                        <input type="text" name="inst" className="input-text" value={form.inst} onChange={handleChange} placeholder="Escribe tu respuesta" autoComplete='off' />
                    </div>
                </div> */}
                <div className='inps'>
                    <label className="labels">Certificado</label>
                    <div className='check-options'>
                        <input type="checkbox" className='check-select-option' value={cert_select} onChange={certSelect} />
                        <span className='ball'></span>
                    </div>
                </div>
                {all_certificates()}
            </div>
            <div className="disp-flex">
                <div className='inps'>
                    <label className="labels">Encargado de sitio</label>
                    <div style={{position: "relative"}}>
                        <div style={{position: "relative", zIndex: "auto"}}>
                            <input onChange={handleChange} type="text" name="enc_sit" value={form.enc_sit}className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' onFocus={focusEncS} />
                        </div>
                        <div style={{position: "absolute", zIndex: 3, width: 100 + "%", marginTop: -3 + "px", maxHeight: 100 + "px", overflow: "hidden", overflowY: "scroll"}}>
                            {
                                worker.length && showEncS ?
                                worker.filter(el => {
                                    return form.enc_sit.toLowerCase() && el[1].toLowerCase().includes(form.enc_sit.toLowerCase()) && el[1].toLowerCase() !== form.enc_sit.toLowerCase()
                                }).map(el => (
                                    <p key={el[0]} style={{color: "black", backgroundColor: "#ccc", padding: 4 + "px", cursor: "pointer"}} onClick={selectEncS}>{el[1]} - {el[0]}</p>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
                <div className='inps'>
                    <label className="labels">Encargado de Área</label>
                    <div style={{position: "relative"}}>
                        <div style={{position: "relative", zIndex: "auto"}}>
                            <input onChange={handleChange} type="text" name="enc_area" ref={form_ref} value={form.enc_area} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' onFocus={focusEncA} />
                        </div>
                        <div style={{position: "absolute", zIndex: 3, width: 100 + "%", marginTop: -3 + "px", maxHeight: 100 + "px", overflow: "hidden", overflowY: "scroll"}}>
                            {
                                worker.length && showEncA ?
                                worker.filter(el => {
                                    return form.enc_area.toLowerCase() && el[1].toLowerCase().includes(form.enc_area.toLowerCase()) && el[1].toLowerCase() !== form.enc_area.toLowerCase()
                                }).map(el => (
                                    <p key={el[0]} style={{color: "black", backgroundColor: "#ccc", padding: 4 + "px", cursor: "pointer"}} onClick={selectEncA}>{el[1]} - {el[0]}</p>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
                <div className='inps'>
                    <label className="labels">Coordinador de permiso</label>
                    <div style={{position: "relative"}}>
                        <div style={{position: "relative", zIndex: "auto"}}>
                            <input onChange={handleChange} type="text" name="coor" value={form.coor} className="input-text" placeholder="Escribe tu respuesta" autoComplete='off' onFocus={focusCoor} />
                        </div>
                        <div style={{position: "absolute", zIndex: 3, width: 100 + "%", marginTop: -3 + "px", maxHeight: 100 + "px", overflow: "hidden", overflowY: "scroll"}}>
                            {
                                worker.length && showCoor ?
                                worker.filter(el => {
                                    return form.coor.toLowerCase() && el[1].toLowerCase().includes(form.coor.toLowerCase()) && el[1].toLowerCase() !== form.coor.toLowerCase()
                                }).map(el => (
                                    <p key={el[0]} style={{color: "black", backgroundColor: "#ccc", padding: 4 + "px", cursor: "pointer"}} onClick={selectCoor}>{el[1]} - {el[0]}</p>
                                )) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="btn-send">
                    <button type="submit" className="btnSubmit">
                        <p>Registrar</p>
                        <div>
                            <FontAwesomeIcon icon={faPencil} className='icon' />
                        </div>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PPTRForm