import './assets/css/bootstrap.css';
import { Component } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap'

// Importa i componenti
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Province from './components/Province';
import Region from './components/Region';

// Importa array province
import provincesArray from './assets/provincesArray';

const ProvinceWrapper = ({ prov = null, map = true, description = true }) => {
  const { provincia } = useParams(); // Usa useParams per ottenere il parametro
  prov = provincia || prov; // Usa il parametro se non è passato
  return <Province province={prov} map={map} description={description} />;
};

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <header>
          <div id='cloudsContainer'></div>
          <MyNav />
        </header>
        <main>
          <Routes>
            {/* Route per la home page */}
            <Route path="/" element={<ProvinceWrapper prov={'Viterbo'} />} />
            {/* Route per la provincia */}
            <Route path="/provincia/:provincia" element={<ProvinceWrapper prov={'Viterbo'} />} />
            <Route path="*" element={<Alert variant="warning">Pagina non trovata</Alert>} />
          </Routes>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </BrowserRouter>
    </div >
  );
};

export default App;
