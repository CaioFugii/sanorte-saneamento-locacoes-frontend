/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './table-analyses.css';
import ContainerPage from '../container-page/container-page';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import TableComponent from '../../components/table/table';
import { addDays } from 'date-fns';

function TableAnalyses() {
  const [data, setData] = React.useState([]);
  let date = new Date();
  let day = date.getDate();

  let month = date.getMonth();

  let year = date.getFullYear();
  let formatDate = year + '-' + String(month).padStart(2, '0') + '-' + day;
  const tokenJwt = localStorage.getItem('token');
  const city = localStorage.getItem('citySelected');
  const getTable = async () => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BASE_URL}/api/completed-services`
      );
      const availableLocations = {
        'Santos - Cubatão': 'SC',
        'São Sebastião - Ilha bela': 'SI',
        'São Vicente': 'SV',
      };
      const location = availableLocations[city];

      url.searchParams.append('from', formatDate);
      url.searchParams.append('to', formatDate);
      url.searchParams.append('location', location);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenJwt,
        },
      });
      if (response.ok) {
        setData(await response.json());
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getTable();
  }, [city]);

  return (
    <ContainerPage>
      <div className="container-table">
        <Calendar />
        {data && <TableComponent data={data}></TableComponent>}
      </div>
    </ContainerPage>
  );
}

function Calendar() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(startDate, endDate);
    let date = new Date();
    let day = date.getDate();

    let month = date.getMonth();

    let year = date.getFullYear();
    let formatDate = year + '-' + String(month).padStart(2, '0') + '-' + day;
  };
  return (
    <div className="container-date">
      <p>Selecionar data de consulta :</p>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        minDate={addDays(new Date(), -30)}
        maxDate={addDays(new Date(), 1)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
}

export default TableAnalyses;
