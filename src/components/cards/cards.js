import Button from 'react-bootstrap/Button';

function Cards({ children }) {
  return (
    <div className="d-grid gap-3">
      <Button variant="primary" size="lg">
        {children}
      </Button>
    </div>
  );
}

export default Cards;
