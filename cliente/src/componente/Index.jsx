
  import React, { useState } from 'react'
  import axios from 'axios'
  import '../estilo/estilo.css';

  import { makeStyles } from '@material-ui/core/styles';
  import TextField from '@material-ui/core/TextField';

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 300,
    },
  }));

  const Index = () => {
    const classes = useStyles();
    const [inputData1, setInputData1] = useState('');
    const [inputData2, setInputData2] = useState('');
    const [inputData3, setInputData3] = useState('');
    const [inputData4, setInputData4] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [mostrarContrasena, setMostrarContrasena] = useState(false); // Estado para la visibilidad de la contraseña

  
    const limpiarCampos = () => {
      console.log('Botón Limpiar Campos clickeado'); // Agrega esta línea
      setInputData1('');
      setInputData2('');
      setInputData3('');
      setInputData4('');
      setError(null);
      window.location.reload();
    };


    const handleChangeInput1 = (event) => {
      setInputData1(event.target.value);
    };
    const handleChangeInput3 = (event) => {
      setInputData3(event.target.value);
    };


    const handleChangeInput2 = (event) => {
      setInputData2(event.target.value);
    };

    const handleChangeInput4 = (event) => {
      setInputData4(event.target.value);
    };

    const handleMostrarContrasena = () => {
      setMostrarContrasena(!mostrarContrasena);
    };

    const ingresar = (event) => {
      event.preventDefault();

      console.log('Llegué aquí antes de la petición Axios');

      // Enviar los datos al servidor usando Axios
      axios.post(`http://localhost:8000/api/excedente/${inputData1}/${inputData2}/${inputData3}/${inputData4}`, { clave: inputData4 })
    .then((response) => {
      console.log('Respuesta del servidor:', response.data);
      const usuarios = Array.isArray(response.data.usuario) ? response.data.usuario : [response.data.usuario];
      setResponseData(usuarios);      // Limpiar los inputs después de enviar la solicitud al servidor
      setInputData1('');
      setInputData2('');
      setInputData3('');
      setInputData4('');
      setError(null);
    })
    .catch((error) => {
      console.error('Error al enviar datos:', error);
      // Manejar errores en caso de que ocurran
      if (error.response) {
        // Error de respuesta del servidor
        setError('Datos incorrectos ¡Intente nuevamente!');
      } else {
        // Error de petición
        setError('Error de petición, por favor inténtalo de nuevo.');
      }
      setInputData1('');
      setInputData2('');
      setInputData3('');
      setInputData4('');
    });

    };

    return (
<div className='d-flex mover'>
  <div className="container caja_principal ">
    <div className='d-flex justify-content-center cajaSeparacionCajas '>
      <div className="caja_izquierda">
        <div className="texto_caja_izquierda ">
          <h1 className="titulo2 mb-3 font-weight-normal text-white">Excedentes 2023</h1>
          <p className="text-white">Descubre tus excedentes del año 2023 aquí. Te invitamos a consultar y gestionar tus excedentes de manera sencilla y eficiente. ¡Explora tus beneficios ahora!</p>
        </div>
        <div className='d-flex justify-content-center cajaFromulario'>
          <form className="form-signin datos" onSubmit={ingresar}>
                  
                  <label className='labelCedula text-start mt-2' htmlFor="cedula"> Ingrese su cédula *</label>
                  <input type="text" className="form-control mb-2" id="cedula" value={inputData1} onChange={handleChangeInput1} 
                    required />
                  <div className="invalid-feedback">Ingrese un número de cédula válido (7 dígitos).</div>

                  <label className='labelSocio text-start mt-2' htmlFor="NroSocio"> Ingrese número de socio *</label>
                  <input type="text" className="form-control mb-2" id="NroSocio" value={inputData3} onChange={handleChangeInput3} n
                    required />

<div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto' }}>
  <input  
    type="checkbox"
    className="form-check-input"
    id="mostrarContrasena"
    checked={mostrarContrasena}
    onChange={handleMostrarContrasena}
    aria-label="Mostrar contraseña"
  />
</div>

<label className='labelClave text-start mt-2' htmlFor="clave"> Ingrese su clave*</label>
<input
    type={mostrarContrasena ? 'text' : 'password'}  
    className="form-control mb-2"
    id="clave"
    value={inputData4}
    onChange={handleChangeInput4}
    placeholder=""
    required />

<label className="form-check-label text-muted" htmlFor="mostrarContrasena">Mostrar contraseña</label>

                  <TextField id="date" type="date"
                    value={inputData2}onChange={handleChangeInput2} className={classes.textField} InputLabelProps={{
                      shrink: true, style: { fontSize: '18px', color: 'white' }
                    }} InputProps={{
                      style: { backgroundColor: 'white', borderRadius: '2px', margin: '15px 0px 0px' }, // Establecer el color del texto a blanco
                    }}  label="Fecha de Nacimiento" required />

<div className='d-flex justify-content-between'>
        <button className='btn btn-lg boton_color' type='submit'>
          Consultar
        </button>
        <button className='btn btn-lg boton_color' type='button' onClick={limpiarCampos}>
          Limpiar Campos
        </button>
      </div>
              </form>
            </div>            
              {error && <div className="text-danger">{error}</div>}
            </div>
          </div>

          <div className="caja_derecha text-white">
            {responseData !== null ? (
              responseData.map((item, index) => (
                <div key={index} className=' d-flex justify-content-center '>
                  <div className='justify-content-end p-0 m-0 contenedorCajaDerecha'>
                    <h4 className=' tituloTabla'>Detalles de Excedentes</h4>
                    <p className='text-left' ><b>Nombre:</b> {item.nombres}</p>
                    <div className='d-flex '>
                      <p className='text-left pr-5' ><b>Cedula:</b> {item.nro_cedula}</p>
                      <p className='text-left pr-5' ><b>Socio N°:</b> {item.nro_socio}</p>
                      <p className='text-left pr-5'><b>Año:</b> {item.anio}</p>
                    </div>

                    <div className='pt-3'>
                      <table className='table m-0 p-0 '>
                        <thead>
                          <tr>
                            <th className='th1'> <b>CONCEPTOS</b></th>
                            <th className='th1'> <b>CRÉDITO</b></th>
                            <th className='th1'> <b>DÉBITO</b></th>
                            <th className='th1'> <b>A COBRAR</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Retorno Interes s/ Aporte Capital' </p></th>
                            <th> <p> {parseFloat(item.por_aporte).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p>0 </p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Retorno por Operaciones Créditos </p></th>
                            <th> <p> {parseFloat(item.por_intereses).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p> 0 </p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Retorno por Operaciones Tarjeta </p></th>
                            <th> <p> {parseFloat(item.por_tarjeta).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p> 0 </p></th>
                            <th> <p><b></b></p></th>
                          </tr>

                          <tr>
                            <th> <p className='font-weight-normal text-left'> Descuento por Créditos </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.desc1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Descuento por Créditos </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.desc2).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Descuento por Tarjeta de Crédito </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.desc3).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Descuento por Solidaridad </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.desc4).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Descuento por Aporte </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.desc5).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal text-left'> Retencion s/ Aporte Capital </p></th>
                            <th> <p> 0 </p></th>
                            <th> <p> {parseFloat(item.retencion_irp).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </p></th>
                            <th> <p><b></b></p></th>
                          </tr>
                          <tr>
                            <th> <p className='font-weight-normal p-1'><b>TOTALES</b> </p></th>
                            <th> <b><p className='p-1'> {parseFloat(item.total_excedente).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                            <th> <b><p className='p-1'> {parseFloat(item.total_deuda).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs.</p></b></th>
                            <th> <b><p className='totales p-1'> {parseFloat(item.total_a_cobrar).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Gs. </p></b></th>
                          </tr>
                        </tbody>

                      </table>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p className='parrafoVacios'> Datos vacios</p>
            )}

          </div>
        </div>
      </div>
    )
  }

  export default Index