import Button from 'react-bootstrap/Button';

function Cards() {
  return (
    <div className="d-grid gap-3">
    <Button variant="primary" size="lg">
      Block level button
    </Button>
    <Button variant="secondary" size="lg">
      Block level button
    </Button>
  </div>
  )
}

export default Cards;