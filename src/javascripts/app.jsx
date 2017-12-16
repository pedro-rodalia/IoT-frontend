// Importacion de librerias
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// Importacion de componentes
import { Main } from './components/main.jsx';

// Declaracion de componentes
const App = () => {
  return(
    <Router basename="/">
      <Main/>
    </Router>
  );
}

ReactDOM.render(<App/>, document.getElementById('root'));
