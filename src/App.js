import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/login/login';
import ButtonFile from './components/button-file-format/button-file';
import Page404 from './components/404/404-page';
import TableAnalyses from './pages/table-analyses/table-analyses';
import ButtonFileExecute from './components/button-file-execute/button-file-execute';
import CityAnalyses from './pages/city-analyses/city-analyses';
import ButtonFilePendente from './components/button-file-pendente/button-file-pendente';
import SuccessExecuteComponent from './components/successExecute/successExecute';
import SuccessPendingComponent from './components/successPending/successPending';
import ErrorExecuteComponent from './components/errorExecute /errorExecute';
import ErrorPendingComponent from './components/successPending copy/errorPending';
import ErrorFileExecuteComponent from './components/errorFileExecute/errorFileExecute';
import ErrorFilePendingComponent from './components/errorFilePending/errorFilePending';

function App() {
  const PrivateRoute = ({ children }) => {
    const authed =
      new Date(localStorage.getItem('exp') * 1000) < new Date() || null;

    return authed ? <Navigate to="/" /> : children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="file"
          element={
            <PrivateRoute>
              <ButtonFile />
            </PrivateRoute>
          }
        />
        <Route
          path="/file-execute"
          element={
            <PrivateRoute>
              <ButtonFileExecute />
            </PrivateRoute>
          }
        />
        <Route
          path="/file-pending"
          element={
            <PrivateRoute>
              <ButtonFilePendente />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Page404 />
            </PrivateRoute>
          }
        />
        <Route
          path="table-analyses"
          element={
            <PrivateRoute>
              <TableAnalyses />
            </PrivateRoute>
          }
        />
        <Route
          path="city"
          element={
            <PrivateRoute>
              <CityAnalyses />
            </PrivateRoute>
          }
        />
        <Route
          path="success-execute"
          element={
            <PrivateRoute>
              <SuccessExecuteComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="success-pending"
          element={
            <PrivateRoute>
              <SuccessPendingComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="error-execute"
          element={
            <PrivateRoute>
              <ErrorExecuteComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="error-file-execute"
          element={
            <PrivateRoute>
              <ErrorFileExecuteComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="error-file-pending"
          element={
            <PrivateRoute>
              <ErrorFilePendingComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="error-pending"
          element={
            <PrivateRoute>
              <ErrorPendingComponent />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
