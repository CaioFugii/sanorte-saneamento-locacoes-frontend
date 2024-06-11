import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/login';
import ButtonFile from './components/button-file-format/button-file';
import Page404 from './components/404/404-page';
import TableAnalyses from './pages/table-analyses/table-analyses';
import ButtonFileExecute from './components/button-file-execute/button-file-execute';
import CityAnalyses from './pages/city-analyses/city-analyses';

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <PrivateRoute path="/file" component={ <ButtonFile />} /> */}
        <Route path="file" element={<ButtonFile />} />
        <Route path="/file-execute" element={<ButtonFileExecute />} />
        <Route path="*" element={<Page404 />} />
        <Route path="table-analyses" element={<TableAnalyses />} />
        <Route path="city" element={<CityAnalyses />} />
      </Routes>
    </BrowserRouter>
  );
}

// const PrivateRoute = ({component: Component, ...rest}) => {

//   const isAuth=() =>{
//     var user = localStorage.getItem('current_user')
//     if(!user){
//       return false

//     }
//     return true
// }
//   return (
  
//     isAuth() ?
//       <Route {...rest} render={props => (
//               <Component {...props} />
          
//       )} />:<Route path='*' element={<Navigate to='/'/>}/> 
//   );
//   };
  

export default App;
