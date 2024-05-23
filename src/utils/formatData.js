export const formatData = (data, headers) => {
  const result = {};
  const finalData = [];

  const formattedData = [];
  data.forEach((element) => {
    formattedData.push({
      [headers[0]]: element[0],
      [headers[1]]: element[1],
      [headers[2]]: element[2],
      [headers[3]]: element[3],
      [headers[4]]: element[4],
      [headers[5]]: element[5],
      [headers[6]]: element[6],
      [headers[7]]: element[7],
      [headers[8]]: element[8],
      [headers[9]]: element[9],
      [headers[10]]: element[10],
      [headers[11]]: element[11],
    });
  });

  formattedData.forEach((element) => {
    const TSS = element.TSS;
    const DATE_SERVICE = element['Data de Competência']?.split(' ')[0];

    if (!result[TSS]) {
      result[TSS] = [
        {
          TSS,
          'Data de Competência': DATE_SERVICE,
        },
      ];
    } else {
      result[TSS] = [
        ...result[TSS],
        {
          TSS,
          'Data de Competência': DATE_SERVICE,
        },
      ];
    }
  });

  const totalLines = [];

  Object.keys(result).forEach((tss) => {
    const tssAmount = {};
    let totalTssAmount = 0;
    result[tss].forEach((element) => {
      if (!tssAmount[element['Data de Competência']]) {
        tssAmount[element['Data de Competência']] = 1;
      } else {
        tssAmount[element['Data de Competência']] += 1;
      }
      totalTssAmount += 1;
    });

    Object.keys(tssAmount).forEach((amount) => {
      finalData.push({
        TSS: tss,
        'data de serviço': amount,
        quantidade: tssAmount[amount],
      });
    });
    finalData.push({
      TSS: '',
      'data de serviço': 'TOTAL',
      quantidade: totalTssAmount,
    });
    totalLines.push(finalData.length + 1);
    finalData.push({
      TSS: '',
      'data de serviço': '',
      quantidade: '',
    });
  });

  return { finalData, totalLines };
};
