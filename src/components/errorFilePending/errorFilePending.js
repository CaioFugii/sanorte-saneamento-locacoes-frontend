import { useNavigate } from 'react-router-dom';
import ContainerPage from '../../pages/container-page/container-page';

function ErrorFilePendingComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <ContainerPage>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong> O arquivo esta vazio! </strong>Clique
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate('/file-pending')}
        >
          aqui
        </button>
        para enviar novamente.
      </div>
    </ContainerPage>
  );
}

export default ErrorFilePendingComponent;
