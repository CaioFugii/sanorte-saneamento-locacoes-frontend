import React from 'react';
import './table-analyses.css';
import ContainerPage from '../container-page/container-page';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import TableComponent from '../../components/table/table';
import data from '../../utils/data-mock';
import { addDays, addMonths } from 'date-fns';

function TableAnalyses() {  

  return (
    <ContainerPage>
      <div className='container-table'>
    <Calendar/>      
      <TableComponent data={data}></TableComponent>
      </div>
    </ContainerPage>
  );

}


function Calendar(){

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className='container-date'>
      <p>Selecionar data de consulta :</p>
    <DatePicker
      selected={startDate}
      onChange={onChange}
      minDate={addDays(new Date(),-30)}
      maxDate={addDays(new Date(),1)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      dateFormat="dd/MM/yyyy"

    />
    </div>
  );
};

export default TableAnalyses;
