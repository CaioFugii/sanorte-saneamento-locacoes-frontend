import React from 'react';
import './table-analyses.css';
import ContainerPage from '../container-page/container-page';
import Cards from '../../components/cards/cards';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function TableAnalyses() {
  const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  };

  const city = ['Santos - Cubatão', 'São Sebastião - Ilha bela', 'São Vicente'];

  return (
    <ContainerPage>
      <DatePicker
        selected={new Date()}
        onSelect={() => console.log(`teste1`)} //when day is clicked
        onChange={() => console.log(`teste1`)} //only when value has changed
      />
      {city.map((item, index) => {
        return <Cards key={index} children={item} />;
      })}
    </ContainerPage>
  );
}

export default TableAnalyses;
