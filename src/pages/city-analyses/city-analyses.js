import React from 'react';
import './city-analyses.css';
import ContainerPage from '../container-page/container-page';
import Cards from '../../components/cards/cards';

import 'react-datepicker/dist/react-datepicker.css';

function CityAnalyses() {
  const location = localStorage.getItem('location');
  const [city, setCity] = React.useState([]);
  React.useEffect(() => {
    if (location) {
      setCity(location.split(','));
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
