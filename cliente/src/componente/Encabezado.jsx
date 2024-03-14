import React from 'react'
import '../estilo/Encabezado.css';
// import '../estilo/Encabezado_nuevo.css';

const Encabezado = () => {
  return (
    <div className='container-fluid p-0 cabezeraPrincipal '>
      <header className="cabecera_nuevo">       
        <div className="cabezera_img container">
          <img className="imgLogo mt-3" src="/logoCoo.png" alt="" />
        </div>
        <div className="divisoria">
          <h1 className="text-center Titulo">Cooperativa 8 de Marzo Ltda.</h1>
          <h4 className=''> Somos una entidad de reconocida solvencia que brinda servicios Financieros y Sociales.</h4>
          <h5>Mauricio José Troche Nº 484 e/Defensores del Chaco y Cacique Lambaré</h5>
          <h5>(021) 918 8000</h5>
        </div>

      </header>

    </div>
  )
}

export default Encabezado