import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/login';
import ButtonFile from './components/button-file/button-file';
import Page404 from './components/404/404-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="file" element={<ButtonFile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
