import './button-file.css';
import Header from '../header/header';

function ButtonFile() {
  return (
    <>
      <Header />
      <div className="container-input-file">
        <div className="text-content">
          <h1 className="title">Inclua um arquivo excel:</h1>
          <label htmlFor="input-button" id="label-input">
            <img src="./icon-file.png" alt="icon-file" />
            Arquivo
          </label>
        </div>

        <input
          type="file"
          id="input-button"
          name="input-button"
          accept="image/png, image/jpeg"
        />
      </div>
    </>
  );
}

export default ButtonFile;
