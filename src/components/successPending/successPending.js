import { useNavigate } from 'react-router-dom';
import ContainerPage from '../../pages/container-page/container-page';

function SuccessPendingComponent(props, content) {
  const navigate = useNavigate();
  return (
    <ContainerPage>
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong> Enviado com sucesso! </strong>Clique
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate('/file-pending')}
        >
          aqui
        </button>
        para incluir um novo arquivo.
      </div>
    </ContainerPage>
  );
}

export default SuccessPendingComponent;
