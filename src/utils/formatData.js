export const formatData = (data) => {
  const result = {};
  const finalData = [];

  data.forEach((element) => {
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
    finalData.push([]);
  });

  return finalData;
};
