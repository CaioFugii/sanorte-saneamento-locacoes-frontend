/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './table-analyses.css';
import ContainerPage from '../container-page/container-page';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import TableComponent from '../../components/table/table';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

function TableAnalyses() {
  const [data, setData] = React.useState([]);
  const [dataPending, setDataPending] = React.useState([]);
  const [isData, setIsData] = useState(true);
  const [lastDatePending, setLastDatePending] = useState(null);
  const [lastDateCompleted, setLastDateCompleted] = useState(null);
  const navigate = useNavigate();

  let date = new Date();
  let day = date.getDate();

  let month = date.getMonth() + 1;

  let year = date.getFullYear();
  let formatDate = year + '-' + String(month).padStart(2, '0') + '-' + day;
  const tokenJwt = localStorage.getItem('token');
  const city = localStorage.getItem('citySelected');

  const getLastDate = async () => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/last-inserts`
      );

      const availableLocations = {
        Santos: 'STS',
        Cubatão: 'CBT',
        'São Sebastião': 'SSB',
        'Ilha bela': 'ILB',
        'São Vicente': 'SVT',
        Guarujá: 'GUJ',
        Bertioga: 'BTG',
      };

      const location = availableLocations[city];
      url.searchParams.append('location', location);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: tokenJwt,
        },
      });
      if (response.ok) {
        const lastDates = await response.json();
        setLastDateCompleted(lastDates[0]);
        setLastDatePending(lastDates[1]);
      }
    } catch (error) {
      navigate('/city');
      console.log(error);
    }
  };
  const getTable = async () => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/completed-services`
      );
      const availableLocations = {
        Santos: 'STS',
        Cubatão: 'CBT',
        'São Sebastião': 'SSB',
        'Ilha bela': 'ILB',
        'São Vicente': 'SVT',
        Guarujá: 'GUJ',
        Bertioga: 'BTG',
      };

      const location = availableLocations[city];

      if (!location) {
        throw new Error('Location is required');
      }

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
  const getTablePending = async () => {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/pending-services`
      );
      const availableLocations = {
        Santos: 'STS',
        Cubatão: 'CBT',
        'São Sebastião': 'SSB',
        'Ilha bela': 'ILB',
        'São Vicente': 'SVT',
        Guarujá: 'GUJ',
        Bertioga: 'BTG',
      };
      const location = availableLocations[city];

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
    getLastDate();
  }, [city]);

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
          {data && (
            <TableComponent
              data={data}
              dataPending={dataPending}
              lastDateCompleted={lastDateCompleted?.date}
              lastDatePending={lastDatePending?.date}
            ></TableComponent>
          )}
        </div>
      )}
    </ContainerPage>
  );
}

export default TableAnalyses;
