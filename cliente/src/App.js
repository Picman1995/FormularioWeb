
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './componente/Index';
import Encabezado from './componente/Encabezado';
import Principal from './componente/Principal';
import Footer from './componente/Footer';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes> 
          <Route path='/' element={<Principal/>} /> 
          <Route path='/encabezado' element={<Encabezado/>} /> 
          <Route path='/footer' element={<Footer/>} /> 
          <Route path='/index/:inputData1/:inputData2/:inputData3/:inputData4' element={<Index/>} /> 
          
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
