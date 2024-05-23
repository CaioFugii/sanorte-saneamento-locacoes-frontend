import './button-file.css';
import Header from '../header/header';
import React from 'react';
import { saveAs } from 'file-saver';
import { formatData } from '../../utils/formatData';
import ExcelJS from 'exceljs';

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
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(arrayBuffer);
        const worksheet = workbook.getWorksheet(1);
        const rows = [];
        let headers = [];
        worksheet.eachRow((row) => {
          if (!headers.length) {
            headers = row.values.map((header) => header);
          } else {
            rows.push(row.values);
          }
        });
        const { finalData, totalLines } = formatData(rows, headers);
        createFile(finalData, totalLines);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('Por favor, envie um arquivo Excel.');
    }
  };

  const getCurrentDateString = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = today.getFullYear();

    return `pendencias_${day}${month}${year}.xlsx`;
  };

  const createFile = async (
    jsonData,
    totalLines,
    headers = ['TSS', 'data de serviço', 'quantidade']
  ) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    worksheet.columns = headers.map((header) => ({
      header: header,
      key: header,
      width: 30,
    }));

    jsonData.forEach((data) => worksheet.addRow(data));

    totalLines.forEach((line) => {
      worksheet.getRow(line).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: '#000000' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '#6495ED' },
        };
      });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0000FF' },
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, getCurrentDateString());
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
