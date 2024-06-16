import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './cards.css'


function Cards({ children }) {
  const navigate = useNavigate();

  function handleClick() {
   
      navigate('/table-analyses');
      localStorage.setItem('current_user','ADMIN')
  }
  return (
    <div className="d-grid gap-4 buttom-city">
      <Button variant="primary" size="lg" onClick={handleClick}>
        {children}
      </Button>
    </div>
  );
}

export default Cards;
