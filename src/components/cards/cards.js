import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Cards({ children }) {
  const navigate = useNavigate();

  function handleClick() {
   
      navigate('/table-analyses');
      localStorage.setItem('current_user','ADMIN')
  }
  return (
    <div className="d-grid gap-3">
      <Button variant="primary" size="lg" onClick={handleClick}>
        {children}
      </Button>
    </div>
  );
}

export default Cards;
