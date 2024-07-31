import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';
import { useState } from 'react';
import './table.css';

const SUB_CATEGORY = {
  'ARREBENTADO DE REDE DE AGUA': 'ARREBENTADO',
  'VAZAMENTO DE ÁGUA COM INFILTRAÇÃO': 'VAZAMENTO',
  'VAZAMENTO DE ÁGUA LEITO TERRA': 'VAZAMENTO',
  'VAZAMENTO DE ÁGUA NO PASSEIO': 'VAZAMENTO',
  'VAZAMENTO DE ÁGUA LEITO PAVIMENTADO': 'VAZAMENTO',
  'CAVALETE VAZANDO': 'CAVALETE',
  'CAVALETE QUEBRADO': 'CAVALETE',
  'REGISTRO DO CAVALETE VAZANDO': 'CAVALETE',
  'REGISTRO DO CAVALETE QUEBRADO': 'CAVALETE',
  'TROCAR RAMAL DE ÁGUA': 'TROCA DE RAMAL',
  'HIDRÔMETRO VAZANDO': 'HIDRÔMETRO',
  'HIDRANTE VAZANDO': 'HIDRANTE',
  'CONSERTO DE REDE DE ESGOTO': 'CONSERTO',
  'CONSERTO DE RAMAL DE ESGOTO': 'CONSERTO',
  'CONSERTAR POÇO DE INSPEÇÃO/VISITA': 'INSPEÇÃO',
  'COLOCAR TAMPÃO EM POÇO INSPEÇÃO/VISITA': 'INSPEÇÃO',
  'DESOBSTRUIDA REDE DE ESGOTO': 'DESOBSTRUÇÃO',
  'TROCAR TERMINAL DE LIMPEZA': 'TROCAR TL',
  'ATERRO DE VALA': 'ATERRO',
  'ATERRO DE VALA INV': 'ATERRO',
  'REPOR ASFALTO': 'REPOR ASFALTO',
  'REPOR ASFALTO INV': 'REPOR ASFALTO',
  'REPOR ASFALTO A FRIO': 'REPOR ASFALTO',
  'REPOR ASFALTO A FRIO INV': 'REPOR ASFALTO',
  'REPOR CASPA ASFALTICA': 'REPOR ASFALTO',
  'REPOR CAPA ASFALTICA INV': 'REPOR ASFALTO',
  'REPOR PASSEIO ADJACENTE ESPECIAL': 'REPOR ESPECIAL',
  'REPOR PASSEIO ADJACENTE ESPECIAL INV': 'REPOR ESPECIAL',
  'REPOR PISO INTERNO ESPECIAL': 'REPOR ESPECIAL',
  'REPOR PISO INTERNO ESPECIAL INV': 'REPOR ESPECIAL',
  'REPOR PASSEIO OPOSTO ESPECIAL': 'REPOR ESPECIAL',
  'REPOR PASSEIO OPOSTO ESPECIAL INV': 'REPOR ESPECIAL',
  'REPOR PASSEIO ADJACENTE CIMENTADO': 'REPOR CIMENTADO',
  'REPOR PASSEIO ADJACENTE CIMENTADO INV': 'REPOR CIMENTADO',
  'REPOR PISO INTERNO CIMENTADO INV': 'REPOR CIMENTADO',
  'REPOR PISO INTERNO CIMENTADO': 'REPOR CIMENTADO',
  'REPOR PASSEIO OPOSTO CIMENTADO': 'REPOR CIMENTADO',
  'REPOR PASSEIO OPOSTO CIMENTADO INV': 'REPOR CIMENTADO',
  'REPOR BLOQUETE': 'REPOR BLOQUETE',
  'REPOR BLOQUETE INV': 'REPOR BLOQUETE',
  'REPOR GUIA': 'REPOR GUIA',
  'REPOR GUIA INV': 'REPOR GUIA',
  'REPOR SARJETA': 'REPOR SARJETA',
  'REPOR SARJETA INV': 'REPOR SARJETA',
  'REPOR GRAMA': 'REPOR GRAMA',
  'REPOR PAREDE/MURO': 'REPOR GRAMA',
  'REPOR CONCRETO': 'REPOR CONCRETO',
  'INCLUIR LIG DE ÁGUA EM CAV MÚLTIPLO S/V': 'N/A',
  'LIGAÇÃO DE ÁGUA DIMENSIONADA': 'N/A',
  'LIGAÇÃO DE ÁGUA DIMENSIONADA S/V': 'N/A',
  'LIGAÇÃO DE ÁGUA EM CAV MULTIPLO': 'N/A',
  'LIGAÇÃO DE ÁGUA S/V': 'N/A',
  'SUBSTITUIR LIGAÇÃO DE AGUA': 'N/A',
  'SUBSTITUIÇÃO DE CAVALETE PARA UMA': 'N/A',
  'LIGAÇÃO DE ESGOTO': 'N/A',
  'LIGAÇÃO DE ESGOTO ADICIONAL': 'N/A',
  'LIGAÇÃO DE ESGOTO AVULSA': 'N/A',
  'LIGAÇÃO DE ESGOTO AVULSA S/V': 'N/A',
  'LIGAÇÃO DE ESGOTO S/V': 'N/A',
  'SUBSTITUIR LIGAÇÃO DE ESGOTO': 'N/A',
  'SUBSTITUIR LIG ESGOTO SIMPLES P/DIMENS': 'N/A',
  'PROLONGAR REDE DE ESGOTO': 'N/A',
  'REMANEJAR REDE DE ESGOTO': 'N/A',
  'RETIRAR ENTULHO': 'RETIRAR ENTULHO',
  'SONDAR RAMAL DE ESGOTO': 'SONDAGENS',
  'SONDAR REDE DE ESGOTO': 'SONDAGENS',
  'TROCAR RAMAL DE ESGOTO': 'TROCAR RAMAL',
  'TROCAR SOLO': 'TROCA DE SOLO',
  'TROCAR SOLO INV': 'TROCA DE SOLO',
  'TESTE DE CORANTE OP': 'CORANTE',
  'CONSTRUIR POÇO DE VISITA': 'CONSTRUÇÃO DE PV/PI',
  'CONSTRUIR POÇO DE INSPEÇÃO': 'CONSTRUÇÃO DE PV/PI',
  'DESCOBRIR POÇO INSPEÇÃO/VISITA': 'DESCOBRIR',
  'DESCOBRIR TERMINAL DE LIMPEZA': 'DESCOBRIR',
  'NIVELAR POÇO DE INSPEÇÃO/VISITA': 'NIVELAR',
  'NIVELAR TERMINAL DE LIMPEZA': 'NIVELAR',
  'FALTA DE ÁGUA GERAL': 'FALTA DE AGUA',
  'FALTA DE ÁGUA LOCAL': 'FALTA DE AGUA',
  'POUCA PRESSÃO DE ÁGUA LOCAL': 'FALTA DE AGUA',
  'POUCA PRESSÃO DE ÁGUA GERAL': 'FALTA DE AGUA',
  'INSTALAR HIDRÔMETRO DESAPARECIDO/FURTADO': 'HIDRO FURTADO',
  'HIDRÔMETRO PARADO': 'HIDRO CORRETIVO',
  'HIDRÔMETRO EMBAÇADO': 'HIDRO CORRETIVO',
  'HIDRÔMETRO INVERTIDO': 'HIDRO CORRETIVO',
  'HIDRÔMETRO QUEBRADO': 'HIDRO CORRETIVO',
  'REATIVAR LIGAÇÃO DE ÁGUA S/V': 'RELIGAÇÕES',
  'RELIGAR ÁGUA A PEDIDO DO CLIENTE': 'RELIGAÇÕES',
  'RESTABELECER LIGAÇÃO MUDAN TITULARID OP': 'RELIGAÇÕES',
  'RESTABELECER LIGAÇÃO OP': 'RELIGAÇÕES',
  'RELIGAR ÁGUA DEB OP': 'RELIGAÇÕES',
  'RELIGAR AGUA IMPEDIMENTO DE LEITURA': 'RELIGAÇÕES',
  'RELIGAR AGUA MUDANÇA TITULARIDADE': 'RELIGAÇÕES',
  'TROCAR CAVALETE (KIT)': 'TROCAR CAVALETE',
  'SONDAR RAMAL DE ÁGUA': 'SONDAGENS',
  'SONDAR REDE DE ÁGUA': 'SONDAGENS',
  'TROCAR RAMAL DE ÁGUA - VAZ NÃO VISIVEL': 'VAZAMENTOS NÃO VISIVEL',
  'VAZAMENTO DE ÁGUA NÃO VISÍVEL CAVALETE': 'VAZAMENTOS NÃO VISIVEL',
  'VAZAMENTO DE ÁGUA NÃO VISÍVEL RAMAL': 'VAZAMENTOS NÃO VISIVEL',
  'VAZAMENTO DE ÁGUA NÃO VISÍVEL REDE': 'VAZAMENTOS NÃO VISIVEL',
  'TROCAR CAVALETE POR UMA': 'TROCAR CAVALETE POR UMA',
  'REGULARIZAR CAVALETE': 'REGULARIZAÇÕES',
  'READEQUAR CAVALETE': 'REGULARIZAÇÕES',
  'SUPRIMIR LIG AGUA DEMOLIÇÃO/UNIFICAÇÃO': 'SUPRIMIR',
  'SUPRIMIR LIG AGUA ENCERRAMENTO CONTRATO': 'SUPRIMIR',
  'SUPRIMIR RAMAL EM SUBST DE LIGAÇÃO ÁGUA': 'SUPRIMIR',
  'SUPRIMIR LIGAÇÃO DE ÁGUA POR DEBITO OP': 'SUPRIMIR',
  'SUPRIMIR LIGAÇÃO DE ÁGUA IRREG': 'SUPRIMIR',
  'SUPRIMIR LIGAÇÃO DE AGUA POR IMOVEL VAGO': 'SUPRIMIR',
  'INTERLIGAR REDE DE ÁGUA': 'INTERLIGAR',
  'INSTALAR VÁLVULA DE REDE DE ÁGUA': 'INSTALAR',
};

function TableComponent({
  data,
  dataPending,
  lastDatePending,
  lastDateCompleted,
}) {
  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
      fill
      variant="pills"
      transition
    >
      <Tab eventKey="home" title="Tarefas executadas">
        <div className="container">
          {lastDateCompleted != null ? (
            <div className="alert alert-warning" role="alert">
              Ultima data de inclusão:
              <span className="alert-link">
                {format(lastDateCompleted, 'dd/MM/yyyy HH:mm')}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          {data.length !== 0 && (
            <div className="scrollBar">
              {data.map((item, index) => {
                const completedHeaders = Object.keys(item.summary);
                completedHeaders.shift();
                completedHeaders.shift();
                completedHeaders.push('Atrasados', 'Atrasados - %');

                return (
                  <div id="tables" key={index}>
                    <Table
                      striped
                      bordered
                      hover
                      variant="primary"
                      responsive="sm"
                    >
                      <thead>
                        <tr>
                          <th key={index}>Referência</th>
                          {completedHeaders.map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td key={index}>{item.tableName}</td>
                          {completedHeaders.map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                item.summary[key] === 0 ? (
                                  <span
                                    className={
                                      index !== 0 &&
                                      index !== 1 &&
                                      index !== 2 &&
                                      item.summary[key] > '0' &&
                                      item.summary[key] > '0%'
                                        ? 'late'
                                        : 'dark'
                                    }
                                  >
                                    {item.summary[key]}
                                  </span>
                                ) : (
                                  <InformationModal
                                    children={item.values}
                                    number={item.summary[key]}
                                    classification={key}
                                    late={index}
                                  />
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                );
              })}
            </div>
          )}
          {data.length === 0 && (
            <div className="alert alert-dark" role="alert">
              Não há tarefas executadas
            </div>
          )}
        </div>
      </Tab>
      <Tab eventKey="late" title="Pendentes">
        <div className="container">
          {lastDatePending != null ? (
            <div className="alert alert-warning" role="alert">
              Ultima data de inclusão:
              <span className="alert-link">
                {format(lastDatePending, 'dd/MM/yyyy HH:mm')}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          {dataPending.length !== 0 && (
            <div className="scrollBar">
              {dataPending.map((item, index) => {
                const pendingHeaders = Object.keys(item.summary);
                pendingHeaders.shift();
                pendingHeaders.shift();
                pendingHeaders.push('Atrasados', 'Atrasados - %');

                return (
                  <div id="tables" key={index}>
                    <Table
                      striped
                      bordered
                      hover
                      variant="primary"
                      responsive="sm"
                    >
                      <thead>
                        <tr key={index}>
                          <th key={index}>Referência</th>
                          {pendingHeaders.map((key, index) => (
                            <th key={index}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item.tableName}</td>
                          {pendingHeaders.map((key, index) => (
                            <th key={index}>
                              <div className="container-number">
                                {key.includes('%') ||
                                item.summary[key] === 0 ? (
                                  <span
                                    className={
                                      index !== 0 &&
                                      index !== 1 &&
                                      index !== 2 &&
                                      item.summary[key] > '0' &&
                                      item.summary[key] > '0%'
                                        ? 'late'
                                        : 'dark'
                                    }
                                  >
                                    {item.summary[key]}
                                  </span>
                                ) : (
                                  <InformationModal
                                    children={item.values}
                                    number={item.summary[key]}
                                    classification={key}
                                    late={index}
                                  />
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                );
              })}
            </div>
          )}
          {dataPending.length === 0 && (
            <div className="alert alert-dark" role="alert">
              Não há tarefas pendentes
            </div>
          )}
        </div>
      </Tab>
    </Tabs>
  );
}

function InformationModal({ children, number, classification, late }) {
  const [lgShow, setLgShow] = useState(false);
  const dataModal = children;

  let dataFiltered = [];

  if (classification === 'Total') {
    dataFiltered = dataModal;
  } else {
    dataFiltered = dataModal.filter(
      (data) => data.classification === classification
    );
  }
  let reportControl = {};

  dataFiltered.forEach((data) => {
    const category = SUB_CATEGORY[data.tss] ?? 'N/A';

    reportControl[category] = (reportControl[category] ?? 0) + 1;
  });
  const total = dataFiltered.length;

  const resultReportControl = Object.keys(reportControl).map((item) => ({
    category: item,
    quantity: reportControl[item],
    percentage: ((reportControl[item] * 100) / total).toFixed(2) + '%',
  }));

  return (
    <>
      <Button
        className={
          late !== 0 && late !== 1 && late !== 2 ? 'late-link' : 'dark-link'
        }
        variant="link"
        onClick={() => setLgShow(true)}
      >
        {number}
      </Button>
      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Informações
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="general-report"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
            variant="pills"
            transition
          >
            <Tab eventKey="general-report" title="Relatório Geral">
              <Table striped bordered hover variant="primary" responsive="sm">
                <thead>
                  <tr>
                    <th>Cidade</th>
                    <th>Endereço</th>
                    <th>Nº de Serviço</th>
                    <th>Status</th>
                    <th>Resultado</th>
                    <th>Data de Início</th>
                    <th>Classificação</th>
                    <th>TSS</th>
                  </tr>
                </thead>
                <tbody>
                  {dataFiltered &&
                    dataFiltered.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td key={i}>{item.city}</td>
                          <td key={i}>{item.address}</td>
                          <td key={i}>{item.order_service}</td>
                          <td key={i}>{item.status}</td>
                          <td key={i}>{item.result}</td>
                          <td key={i}>
                            {format(item.start_date, 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td key={i}>{item.classification}</td>
                          <td key={i}>{item.tss}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="control-report" title="Relatório de Controle">
              <Table striped bordered hover variant="primary" responsive="sm">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Quantidade</th>
                    <th>Porcentagem</th>
                  </tr>
                </thead>
                <tbody>
                  {resultReportControl.map((item) => {
                    return (
                      <tr key={item.category}>
                        <td key={item.category}>{item.category}</td>
                        <td key={item.category}>{item.quantity}</td>
                        <td key={item.category}>{item.percentage}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
          <div></div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableComponent;
