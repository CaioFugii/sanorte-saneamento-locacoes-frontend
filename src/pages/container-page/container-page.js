import React from 'react';
import './container-page.css';
import Header from '../../components/header/header';

function ContainerPage(props) {


  return (
  <>
  <Header/>
  <div className="container-input-file">        
        {props.children}        
      </div></>
  );
}

export default ContainerPage;
