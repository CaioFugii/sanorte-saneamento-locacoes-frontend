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
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

function TableAnalyses() {
  const [data, setData] = React.useState([]);
  const [dataPending, setDataPending] = React.useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [isData, setIsData] = useState(true);
  const navigate = useNavigate();

  let date = new Date();
  let day = date.getDate();

  let month = date.getMonth();

  let year = date.getFullYear();
  let formatDate = year + '-' + String(month).padStart(2, '0') + '-' + day;
  const tokenJwt = localStorage.getItem('token');
  const city = localStorage.getItem('citySelected');
  const getTable = async (initialDateFilter, endDateFilter) => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/completed-services`
      );
      const availableLocations = {
        'Santos - Cubatão': 'SC',
        'São Sebastião - Ilha bela': 'SI',
        'São Vicente': 'SV',
      };
      const location = availableLocations[city];

      if (!location) {
        throw new Error('Location is required');
      }

      url.searchParams.append('from', initialDateFilter);
      url.searchParams.append('to', endDateFilter);
      url.searchParams.append('location', location);
      setIsData(true);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenJwt,
        },
      });
      if (response.ok) {
        setData(await response.json());
        setIsData(false);
      }
    } catch (error) {
      navigate('/city');
      console.log(error);
    }
  };
  const getTablePending = async (initialDateFilter, endDateFilter) => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/pending-services`
      );
      const availableLocations = {
        'Santos - Cubatão': 'SC',
        'São Sebastião - Ilha bela': 'SI',
        'São Vicente': 'SV',
      };
      const location = availableLocations[city];

      url.searchParams.append('from', initialDateFilter);
      url.searchParams.append('to', endDateFilter);
      url.searchParams.append('location', location);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenJwt,
        },
      });
      if (response.ok) {
        setDataPending(await response.json());
        setIsData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getTable(formatDate, formatDate);
    getTablePending(formatDate, formatDate);
  }, [city]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    let startDay = startDate.getDate();

    let startMonth = startDate.getMonth();

    let startYear = startDate.getFullYear();
    let formatDateStart =
      startYear + '-' + String(startMonth).padStart(2, '0') + '-' + startDay;
    let endDay = startDate.getDate();

    let endMonth = startDate.getMonth();

    let endYear = startDate.getFullYear();
    let formatDateEnd =
      endYear + '-' + String(endMonth).padStart(2, '0') + '-' + endDay;
    getTable(formatDateStart, formatDateEnd);
    getTablePending(formatDateStart, formatDateEnd);
  };

  return (
    <ContainerPage>
      {isData === true && (
        <div>
          <ReactLoading
            type={'spin'}
            color={'#ffffff'}
            height={50}
            width={50}
          />
        </div>
      )}
      {isData === false && (
        <div className="container-table">
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
          {data && (
            <TableComponent
              data={data}
              dataPending={dataPending}
            ></TableComponent>
          )}
        </div>
      )}
    </ContainerPage>
  );
}

export default TableAnalyses;
