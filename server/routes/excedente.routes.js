const ExcedenteListar = require('../controllers/excedente.controllers')


module.exports = (app) =>{        
    app.post('/api/excedente/:inputData1/:inputData2/:inputData3/:inputData4', ExcedenteListar.obtenerExcedente)               
}