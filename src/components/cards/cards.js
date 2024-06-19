import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './cards.css';
import React from 'react';

function Cards({ children }) {
  const navigate = useNavigate();
  const [isInvalid, setInvalid] = React.useState(false);
  let date = new Date();
  let day = date.getDate();

  let month = date.getMonth();

  let year = date.getFullYear();
  let formatDate = year + '-' + String(month).padStart(2, '0') + '-' + day;

  async function handleClick(e) {
    try {
      const url = new URL(
        `${process.env.REACT_APP_BASE_URL}/api/completed-services`
      );
      const availableLocations = {
        'Santos - Cubatão': 'SC',
        'São Sebastião - Ilha bela': 'SI',
        'São Vicente': 'SV',
      };
      const location = availableLocations[e.target.innerHTML];

      url.searchParams.append('from', formatDate);
      url.searchParams.append('to', formatDate);
      url.searchParams.append('location', location);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbiI6IioiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTg4MDcyMjksImV4cCI6MTcxOTQxMjAyOX0.YpIqM89hS_iSYpZ1_RCpPeHb1khBZ1Jgjy2EutnNj4c',
        },
      });
      console.log(response);
      navigate('/file');
      localStorage.setItem('current_user', 'ADMIN');
    } catch (error) {
      setInvalid(true);
    }

    navigate('/table-analyses');
    localStorage.setItem('current_user', 'ADMIN');
  }
  return (
    <div className="d-grid gap-4 buttom-city">
      <Button variant="primary" size="lg" onClick={(e) => handleClick(e)}>
        {children}
      </Button>
    </div>
  );
}

export default Cards;
