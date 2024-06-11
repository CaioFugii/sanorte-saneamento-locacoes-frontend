import React from 'react';
import './table-analyses.css';
import ContainerPage from '../container-page/container-page';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import TableComponent from '../../components/table/table';
import data from '../../utils/data-mock';

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


  return (
    <ContainerPage>
      <div className='container-table'>
      <DatePicker
        selected={new Date()}
        onSelect={() => console.log(`teste1`)} //when day is clicked
        onChange={() => console.log(`teste1`)} //only when value has changed
      />
      <TableComponent data={data}></TableComponent>
      </div>
    </ContainerPage>
  );
}

export default TableAnalyses;
