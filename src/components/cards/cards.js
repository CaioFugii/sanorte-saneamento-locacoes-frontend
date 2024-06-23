import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './cards.css';
import React from 'react';

function Cards({ children }) {
  const navigate = useNavigate();

  function handleClick(e) {
    localStorage.setItem('citySelected', e.target.innerHTML);

    navigate('/table-analyses');
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
