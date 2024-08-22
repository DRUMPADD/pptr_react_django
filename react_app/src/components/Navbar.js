// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {React} from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
    // const myRef = useRef(null)
    // const [hide, setHide] = useState(true);
    // const handleClick = e => {
    // setHide(!hide)
    // if(hide) {
    //   myRef.current.style.rotate = "180deg";
    //   return
    // } else {
    //   myRef.current.style.rotate = "0deg";
    // }
  // }
  return (
    <nav className='navbar'>
      <div className='head-navbar'>
        <p>Pemex</p>
        {/* <div className='cont-btnArrow'>
          <button type='button' id='btnArrow' ref={myRef} onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowLeft} className='icons' width={"20"} />
          </button>
        </div> */}
      </div>
      {/* <ul className={'nav-links' + (window.innerWidth > 800 && hide ? " hidden" : "")}> */}
      <ul className={'nav-links'}>
        <li className='nav-link'>
          <Link to='/' className='link'>
            <span>Registrar permiso</span>
            <i className='fa-solid fa-file-pen'></i>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to='/search' className='link'>
            <span>Buscar permiso</span>
            <i className='fa-solid fa-folder-open'></i>
          </Link>
        </li>
        <li className='nav-link'>
          <Link to='/stadistics' className='link'>
            <span>Indicadores permisos</span>
            <span>
              <i className='fa-solid fa-chart-simple'></i>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar