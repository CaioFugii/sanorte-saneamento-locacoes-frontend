import { useNavigate } from 'react-router-dom';
import ContainerPage from '../../pages/container-page/container-page';

function ErrorExecuteComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <ContainerPage>
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong> Erro ao enviar arquivo! </strong>Clique
        <button
          type="button"
          className="btn btn-link"
          onClick={() => navigate('/file-execute')}
        >
          aqui
        </button>
        para tentar novamente.
      </div>
    </ContainerPage>
  );
}

export default ErrorExecuteComponent;
