const crypto = require('crypto');
const xml2js = require('xml2js');

exports.obtenerExcedente = (req, res) => {
    const inputData1 = req.params.inputData1;
    const inputData2 = req.params.inputData2;
    const inputData3 = req.params.inputData3;

    // Validar parámetros de entrada
    if (!inputData1 || !inputData2 || !inputData3) {
        res.status(400).json({ message: 'Parámetros de entrada inválidos' });
        return;
    }

    // Realizar la consulta a la base de datos
    pool.query('SELECT nombres, nro_cedula, TO_CHAR(cl_fechnac, \'DD-MM-YYYY\') AS cl_fechnac_formatted, anio, nro_socio, por_aporte, por_intereses, por_tarjeta, total_excedente, desc1, desc2, desc3, desc4, desc5, retencion_irp, total_deuda, total_a_cobrar, pin_acceso FROM excedentesweb WHERE nro_cedula = $1 AND cl_fechnac = $2 and anio = 2022 and nro_socio = $3', [inputData1, inputData2, inputData3], (error, results) => {
        if (error) {
            console.error('Error al obtener excedente:', error);
            res.status(500).json({ message: 'Error al obtener excedente' });
        } else {
            // Verificar si se encontraron resultados
            if (results.rows.length === 0) {
                res.status(404).json({ message: 'No se encontraron resultados para la cédula proporcionada o la clave del socio es incorrecta' });
            } else {
                const usuario = results.rows[0];

                // Asegúrate de que la clave se esté enviando en el cuerpo de la solicitud (req.body)
                const claveIngresada = req.body.clave;



                if (!claveIngresada) {
                    res.status(400).json({ message: 'La clave no fue proporcionada en la solicitud' });
                    return;
                }
                const Acceso= usuario.nro_cedula + claveIngresada;



                // Aquí puedes realizar la comparación del hash almacenado con el hash de la clave proporcionada
                const hashIngresado = crypto.createHash('md5').update(Acceso).digest('hex');

                console.log('Hash almacenado en la base de datos:', usuario.pin_acceso);
                console.log('Hash ingresado desde el formulario:', hashIngresado);

                if (hashIngresado === usuario.pin_acceso) {
                    // La clave es válida
                    console.log('Clave válida. Acceso permitido.');

                    // Verificar el tipo de solicitud (JSON o XML)
                    const responseType = req.accepts(['json', 'xml']);

                    if (responseType === 'xml') {
                        // Convertir el resultado a XML
                        const xmlBuilder = new xml2js.Builder({
                            rootName: 'response', // Elemento raíz del XML
                            headless: true, // No incluir la declaración XML
                        });
                        const xmlResponse = xmlBuilder.buildObject({ usuario });

                        res.set('Content-Type', 'application/xml');
                        res.status(200).send(xmlResponse);
                    } else {
                        // Devolver el resultado en formato JSON por defecto
                        res.status(200).json({ usuario });
                    }
                } else {
                    // La clave no es válida
                    console.log('Clave no válida. Acceso denegado.');
                    res.status(401).json({ message: 'Credenciales incorrectas' });
                }
            }
        }
    });
};
