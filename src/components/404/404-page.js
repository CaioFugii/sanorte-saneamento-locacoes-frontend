import './404-page.css';
import Header from '../header/header';

function Page404() {
  return (
    <>
      <Header />
      <div className="container-input-file">
        <div className="text-content">
          <h1 className="title"> Error 404</h1>
          <h2 className="title">Página não encontrada.</h2>
        </div>
      </div>
    </>
  );
}

export default Page404;
