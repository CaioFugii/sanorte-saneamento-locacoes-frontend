import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/login';
import ButtonFile from './components/button-file/button-file';
import Page404 from './components/404/404-page';

function App() {

  
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Login />} />
        {/* <PrivateRoute path="/file" component={ <ButtonFile />} /> */}
        <Route path="file" element={<ButtonFile />} />
        <Route path="*" element={<Page404 />} />

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
