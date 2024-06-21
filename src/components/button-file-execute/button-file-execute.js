import './button-file-execute.css';
import React from 'react';
import AlertModal from '../modal/modal';
import ContainerPage from '../../pages/container-page/container-page';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

function ButtonFileExecute() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowError, setModalShowError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isData, setIsData] = React.useState(false);
  const navigate = useNavigate();

  const tokenJwt = localStorage.getItem('token');

  async function handleFileUpload(event) {
    console.log(event.target.files);
    const file = event.target.files[0];
    if (
      file &&
      (file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
      try {
        setIsData(true);
        const formData = new FormData();
        formData.append('file', file);
        await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/completed-services`,
          {
            method: 'POST',
            headers: {
              Authorization: tokenJwt,
            },
            body: formData,
          }
        );
        setSuccess(true);
        setIsData(false);
      } catch (error) {
        setModalShow(true);
        setModalShowError(true);
      }
    }
  }
  function newFile() {
    navigate('/file-execute');
    setIsData(false);
    setSuccess(false);
  }

  return (
    <>
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
        {isData === false && success === false && (
          <div className="text-content">
            <h1 className="title">Arquivos de executados:</h1>
            <label htmlFor="input-button" id="label-input">
              <img src="./icon-file.png" alt="icon-file" />
              Arquivo
            </label>
          </div>
        )}
        {success === true && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong> Enviado com sucesso! </strong>Clique
            <button
              type="button"
              className="btn btn-link"
              onClick={() => newFile()}
            >
              aqui
            </button>
            para incluir um novo arquivo.
          </div>
        )}

        <input
          type="file"
          multiple={false}
          id="input-button"
          onChange={handleFileUpload}
          name="input-button"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </ContainerPage>
      <AlertModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text={'Por favor, envie um arquivo Excel.'}
      />
      <AlertModal
        show={modalShowError}
        onHide={() => setModalShowError(false)}
        text={'Erro ao enviar arquivo'}
      />
    </>
  );
}

export default ButtonFileExecute;
