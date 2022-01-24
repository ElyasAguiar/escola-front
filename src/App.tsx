import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import TituloIndex from './TituloIndex'
import TituloEdit from './TituloEdit'
import { Router } from "@reach/router";

const App = () => <div>              
                    <Router>
                      <TituloIndex path='/' url={'https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/titulo'} />
                      <TituloEdit  path='/editTitulo/:action' />
                      <TituloEdit  path='/editTitulo/:action/:id' />
                    </Router>      
                  </div> 

export default App