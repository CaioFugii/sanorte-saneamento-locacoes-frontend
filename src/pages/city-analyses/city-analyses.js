import React from 'react';
import './city-analyses.css';
import ContainerPage from '../container-page/container-page';
import Cards from '../../components/cards/cards';

import 'react-datepicker/dist/react-datepicker.css';

function CityAnalyses() {
 
  const city = ['Santos - Cubatão', 'São Sebastião - Ilha bela', 'São Vicente'];

  fetch('https://ranekapi.origamid.dev/json/api/produto')
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  });


  return (
    <ContainerPage>
      {city.map((item, index) => {
        return <Cards key={index} children={item} />;
      })}
    </ContainerPage>
  );
}

export default CityAnalyses;
