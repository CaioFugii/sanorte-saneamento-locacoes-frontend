import './button-file.css';
import Header from '../header/header';
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { formatData } from '../../utils/formatData';

function ButtonFile() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel')
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const arrayOfObjects = XLSX.utils.sheet_to_json(sheet);
        createFile(formatData(arrayOfObjects));
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Por favor, envie um arquivo Excel.');
    }
  };

  const createFile = (jsonData) => {
    const newWorkbook = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
    const workBookResult = XLSX.write(newWorkbook, {
      bookType: 'xlsx',
      type: 'binary',
    });

    const stringToArrayOfBuffers = (chunk) => {
      const buf = new ArrayBuffer(chunk.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < chunk.length; i++) {
        view[i] = chunk.charCodeAt(i) & 0xff;
      }
      return buf;
    };

    saveAs(
      new Blob([stringToArrayOfBuffers(workBookResult)], {
        type: 'application/octet-stream',
      }),
      'updated_file.xlsx'
    );
  };

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
          multiple={false}
          id="input-button"
          onChange={handleFileUpload}
          name="input-button"
          accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
      </div>
    </>
  );
}

export default ButtonFile;
