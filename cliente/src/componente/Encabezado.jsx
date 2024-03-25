import React from 'react'
import '../estilo/Encabezado.css';
// import '../estilo/Encabezado_nuevo.css';

const Encabezado = () => {
  return (
    <div className='container-fluid p-0 cabezeraPrincipal '>
      <header className="cabecera_nuevo">       
        <div className="cabezera_img container">
          <img className="imgLogo mt-3" src="/AQUI URL PARA UN LOGO" alt="" />
        </div>
        <div className="divisoria">
          <h1 className="text-center Titulo">COOPERATIVA</h1>
          <h4 className=''> Somos una entidad de reconocida solvencia que brinda servicios Financieros y Sociales.</h4>
          <h5>ITA CURUPAITY C/ SOLDADO DESCONOCIDO</h5>
          <h5>0972469523</h5>
        </div>

      </header>

    </div>
  )
}

export default Encabezado