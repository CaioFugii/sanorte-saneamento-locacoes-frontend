import React from 'react';
import './city-analyses.css';
import ContainerPage from '../container-page/container-page';
import Cards from '../../components/cards/cards';

import 'react-datepicker/dist/react-datepicker.css';

function CityAnalyses() {
  const location = localStorage.getItem('location');
  const [city, setCity] = React.useState([]);
  React.useEffect(() => {
    if (location === '*') {
      setCity(['Santos - Cubatão', 'São Sebastião - Ilha bela', 'São Vicente']);
    } else if (location === 'Santos - Cubatão') {
      setCity(['Santos - Cubatão']);
    } else if (location === 'São Sebastião - Ilha bela') {
      setCity(['São Sebastião - Ilha bela']);
    } else if (location === 'São Vicente') {
      setCity(['São Vicente']);
    }
  }, [location]);

  return (
    <ContainerPage>
      {city.map((item, index) => {
        return <Cards key={index} children={item} />;
      })}
    </ContainerPage>
  );
}

export default CityAnalyses;
