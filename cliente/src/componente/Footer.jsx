import React from 'react'
import '../estilo/Footer.css';

const Footer = () => {
  return (

    <>
      <div>

        <footer className="pie_pagina d-flex ">

          <div className="container ">
            <div className="row">
              <div className='col'>
                <p className="parrafo_f ">&copy; Cooperativa 8 de Marzo Ltda.</p>
              </div>
              <div className='d-flex redes'> 
                <div className="col social-icon">
                  <a className="text-white" href="https://www.instagram.com/cooperativa8demarzoltda/?hl=es" >
                    <i className="fab fa-instagram fa-3x"></i>
                  </a>
                </div>
                <div className="col social-icon">
                  <a className="text-white" href="https://www.facebook.com/cooperativa8demarzo/?locale=es_LA">
                    <i className="fab fa-facebook fa-3x"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>


      </div>
    </>
  )
}

export default Footer