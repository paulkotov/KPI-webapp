import React, { Component } from 'react';
import { render } from 'react-dom'

import Header from './components/Header';
import SideMenu from './components/SideMenu';
import TableComp from './components/TableComp';
import Login from './components/Login';
import Structure from './components/Structure';


const App = () => (
            <div>
              <Header/>
              <div class="container" style={{display: 'flex'}}>
                <SideMenu/>
                <TableComp/>
              </div>
            </div>
          );

// const App = () => (
//           <div>
//               <Login/>
//           </div>
// );

// const App = () => (
//           <div>
//               <Structure/>
//           </div>
// );


render(<App />, document.getElementById('root'));
