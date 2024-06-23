import './button-file.css';
import React from 'react';
import { saveAs } from 'file-saver';
import {
  checkExpiredService,
  formatData,
  getCurrentDateString,
  mergeDataByGroup,
} from '../../utils/excel-file';
import ExcelJS from 'exceljs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ContainerPage from '../../pages/container-page/container-page';

function ButtonFile() {
  const [modalShow, setModalShow] = React.useState(false);
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
        const formattedData = formatData(rows, headers);
        const mergedData = mergeDataByGroup(formattedData);

        await createFile(mergedData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      setModalShow(true);
    }
  };

  const createFile = async (dataFile) => {
    const headers = ['TSS', 'Data de Competência', 'quantidade'];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Planilha 1');

    worksheet.columns = headers.map((header) => ({
      header: header,
      key: header,
      width: 30,
    }));

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFF' } };
      cell.alignment = { horizontal: 'center' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0000FF' },
      };
    });

    Object.keys(dataFile).forEach((key) => {
      const totalOfSet = dataFile[key].reduce(
        (accumulator, data) => accumulator + data.quantidade,
        0
      );

      dataFile[key].forEach((item) => {
        const row = worksheet.addRow({
          TSS: item.TSS,
          'Data de Competência': item['Data de Competência'],
          quantidade: item.quantidade,
        });

        const isExpired = checkExpiredService(
          item.TSS,
          item['Data de Competência']
        );

        if (isExpired) {
          row.eachCell((cell) => {
            cell.font = { color: { argb: 'FF0000' } };
          });
        }
      });

      const ROW_TOTAL = worksheet.addRow({
        TSS: '',
        'Data de Competência': 'Total',
        quantidade: totalOfSet,
      });

      ROW_TOTAL.eachCell((cell) => {
        cell.alignment = { horizontal: 'right' };
        cell.font = { bold: true, color: { argb: '000000' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '6FA8DC' },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, getCurrentDateString());
  };

  return (
    <>
      <ContainerPage>
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
      </ContainerPage>

      <Modal
        show={modalShow}
        onHide={!modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>'Por favor, envie um arquivo Excel.'</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Entendi</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ButtonFile;
