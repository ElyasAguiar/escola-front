import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TituloIndex from './TituloIndex';
import TituloEdit from './TituloEdit';
import ProfessorIndex from './ProfessorIndex';
import ProfessorEdit from './ProfessorEdit';
import { Router } from '@reach/router';

const App = () => (
  <div>
    <Router>
      <TituloIndex
        path='/'
        url={
          'https://escola-api.caprover.programadornoob.io/start_point/titulo'
        }
      />
      <TituloEdit path='/editTitulo/:action' />
      <TituloEdit path='/editTitulo/:action/:id' />
      <ProfessorIndex
        path='/professor/'
        url={
          'https://escola-api.caprover.programadornoob.io/start_point/professor'
        }
      />
      <ProfessorEdit path='/editProfessor/:action' />
      <ProfessorEdit path='/editProfessor/:action/:id' />
    </Router>
  </div>
);

export default App;
