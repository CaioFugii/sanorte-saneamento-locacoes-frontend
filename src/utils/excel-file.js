import { add, isAfter } from 'date-fns';

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
      [headers[12]]: element[12],
      [headers[13]]: element[13],
      [headers[14]]: element[14],
      [headers[15]]: element[15],
      [headers[16]]: element[16],
      [headers[17]]: element[17],
      [headers[18]]: element[18],
      [headers[19]]: element[19],
      [headers[20]]: element[20],
      [headers[21]]: element[21],
      [headers[22]]: element[22],
      [headers[23]]: element[23],
      [headers[24]]: element[24],
      [headers[25]]: element[25],
      [headers[26]]: element[26],
      [headers[27]]: element[27],
      [headers[28]]: element[28],
      [headers[29]]: element[29],
      [headers[30]]: element[30],
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

  Object.keys(result).forEach((tss) => {
    const tssAmount = {};
    result[tss].forEach((element) => {
      if (!tssAmount[element['Data de Competência']]) {
        tssAmount[element['Data de Competência']] = 1;
      } else {
        tssAmount[element['Data de Competência']] += 1;
      }
    });

    Object.keys(tssAmount).forEach((amount) => {
      finalData.push({
        TSS: tss,
        'Data de Competência': amount,
        quantidade: tssAmount[amount],
      });
    });
  });

  return finalData;
};

export const mergeDataByGroup = (data) => {
  const SETS = {
    'CAVALETE VAZANDO': 1,
    'CAVALETE QUEBRADO': 1,
    'REGISTRO DO CAVALETE VAZANDO': 1,
    'REGISTRO DO CAVALETE QUEBRADO': 1,
    'VAZAMENTO DE ÁGUA NÃO VISÍVEL CAVALETE': 1,
    'FALTA DE ÁGUA GERAL': 2,
    'FALTA DE ÁGUA LOCAL': 2,
    'POUCA PRESSÃO DE ÁGUA GERAL': 2,
    'POUCA PRESSÃO DE ÁGUA LOCAL': 2,
    'VAZAMENTO DE ÁGUA COM INFILTRAÇÃO': 3,
    'VAZAMENTO DE ÁGUA LEITO PAVIMENTADO': 3,
    'VAZAMENTO DE ÁGUA NÃO VISÍVEL REDE': 3,
    'VAZAMENTO DE ÁGUA NO PASSEIO': 3,
    'VAZAMENTO DE ÁGUA LEITO TERRA': 3,
    'VAZAMENTO DE ÁGUA LEITO ': 3,
    'VAZAMENTO DE ÁGUA NA VÁLVULA': 3,
    'VAZAMENTO DE ÁGUA NÃO VISÍVEL RAMAL': 3,
    'VAZAMENTO DE ÁGUA EM RAMAL ABANDONADO': 3,
    'TROCAR RAMAL DE ÁGUA - VAZ NÃO VISIVEL': 4,
    'TROCAR RAMAL DE ÁGUA': 4,
    'TROCAR HIDRÔMETRO PREVENTIVA': 5,
    'TROCAR HIDRÔMETRO PREVENTIVA AGENDADA': 5,
    'HIDRÔMETRO EMBAÇADO': 6,
    'HIDRÔMETRO INVERTIDO': 6,
    'HIDRÔMETRO PARADO': 6,
    'HIDRÔMETRO QUEBRADO': 6,
    'HIDRÔMETRO VAZANDO': 7,
    'INSTALAR HIDRÔMETRO DESAPARECIDO/FURTADO': 7,
    'NIVELAR POÇO DE INSPEÇÃO/VISITA': 8,
    'DESCOBRIR POÇO INSPEÇÃO/VISITA': 8,
    'NIVELAR TERMINAL DE LIMPEZA': 9,
    'DESCOBRIR TERMINAL DE LIMPEZA': 9,
    'LIGAÇÃO DE ESGOTO S/V': 10,
    'LIGAÇÃO DE ESGOTO AVULSA S/V': 10,
    'REPOR ASFALTO': 11,
    'REPOR ASFALTO INV': 11,
    'REPOR CONCRETO': 12,
    'REPOR PISO INTERNO CIMENTADO': 12,
    'REPOR PASSEIO ADJACENTE CIMENTADO': 13,
    'REPOR PASSEIO ADJACENTE CIMENTADO INV': 13,
    'REPOR PASSEIO OPOSTO CIMENTADO': 13,
    'REPOR PASSEIO ADJACENTE ESPECIAL': 14,
    'REPOR PASSEIO ADJACENTE ESPECIAL INV': 14,
    'REPOR PASSEIO OPOSTO ESPECIAL': 14,
  };

  const result = {};

  data.forEach((item) => {
    const categoria = SETS[item.TSS];
    if (categoria) {
      if (!result[categoria]) {
        result[categoria] = [];
      }
      result[categoria].push(item);
    } else {
      if (!result[item.TSS]) {
        result[item.TSS] = [item];
      } else {
        result[item.TSS] = [...result[item.TSS], item];
      }
    }
  });

  return result;
};

export const getCurrentDateString = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `pendencias_${day}${month}${year}.xlsx`;
};

export const checkExpiredService = (tss, dateService) => {
  const deadlines = {
    'VAZAMENTO DE ÁGUA EM RAMAL ABANDONADO': 24,
    'VAZAMENTO DE ÁGUA COM INFILTRAÇÃO': 24,
    'VAZAMENTO DE ÁGUA LEITO TERRA': 24,
    'VAZAMENTO DE ÁGUA NO PASSEIO': 24,
    'VAZAMENTO DE ÁGUA LEITO PAVIMENTADO': 24,
    'VAZAMENTO DE ÁGUA NÃO VISÍVEL REDE': 24,
    'VAZAMENTO DE ÁGUA NÃO VISÍVEL CAVALETE': 24,
    'CAVALETE VAZANDO': 24,
    'CAVALETE QUEBRADO': 24,
    'REGISTRO DO CAVALETE QUEBRADO': 24,
    'REGISTRO DO CAVALETE VAZANDO': 24,
    'TROCAR RAMAL DE ÁGUA': 24,
    'TROCAR RAMAL DE ÁGUA - VAZ NÃO VISIVEL': 24,
    'INSTALAR HIDRÔMETRO DESAPARECIDO/FURTADO': 24,
    'CONSERTO DE REDE DE ESGOTO': 24,
    'CONSERTO DE RAMAL DE ESGOTO': 24,
    'DESOBSTRUIR REDE DE ESGOTO': 24,
    'DESOBSTRUIR RAMAL DE ESGOTO': 24,
    'HIDRÔMETRO QUEBRADO': 48,
    'HIDRÔMETRO EMBAÇADO': 48,
    'HIDRÔMETRO INVERTIDO': 48,
    'HIDRÔMETRO PARADO': 48,
    'REATIVAR LIGAÇÃO DE ÁGUA S/V': 48,
    'RELIGAR ÁGUA A PEDIDO DO CLIENTE': 48,
    'RELIGAR ÁGUA DEB OP': 48,
    'RELIGAR AGUA IMPEDIMENTO DE LEITURA': 48,
    'RELIGAR AGUA MUDANÇA TITULARIDADE': 48,
    'TROCAR CAVALETE (KIT)': 72,
    'READEQUAR CAVALETE': 72,
    'TROCAR RAMAL DE ESGOTO': 72,
    'REPOR ASFALTO': 168,
    'REPOR ASFALTO A FRIO': 168,
    'REPOR ASFALTO A FRIO INV': 168,
    'REPOR CAPA ASFALTICA INV': 168,
    'REPOR CASPA ASFALTICA': 168,
    'REPOR ASFALTO INV': 168,
    'REPOR PASSEIO ADJACENTE ESPECIAL': 168,
    'REPOR PASSEIO ADJACENTE ESPECIAL INV': 168,
    'REPOR PASSEIO ADJACENTE CIMENTADO': 168,
    'REPOR PASSEIO ADJACENTE CIMENTADO INV': 168,
    'REPOR CONCRETO': 168,
    'REPOR PISO INTERNO CIMENTADO': 168,
    'REPOR PISO INTERNO ESPECIAL': 168,
    'SUPRIMIR LIGAÇÃO DE ÁGUA POR DEBITO OP': 168,
    'SUPRIMIR LIGAÇÃO DE ÁGUA IRREG': 168,
    'SUPRIMIR RAMAL EM SUBST DE LIGAÇÃO ÁGUA': 168,
    'SUPRIMIR LIGAÇÃO DE AGUA POR IMOVEL VAGO': 168,
    'SUPRIMIR LIG AGUA DEMOLIÇÃO/UNIFICAÇÃO': 168,
    'SUPRIMIR LIG AGUA ENCERRAMENTO CONTRATO': 168,
    'TROCA DE RAMAL PREVENTIVA': 168,
    'SUBSTITUIÇÃO DE CAVALETE PARA UMA': 168,
    'NIVELAR POÇO DE INSPEÇÃO/VISITA': 216,
    'DESCOBRIR TERMINAL DE LIMPEZA': 216,
    'NIVELAR TERMINAL DE LIMPEZA': 216,
    'INCLUIR LIG DE ÁGUA EM CAV MÚLTIPLO S/V': 240,
    'LIGAÇÃO DE ÁGUA DIMENSIONADA': 240,
    'LIGAÇÃO DE ÁGUA S/V': 240,
    'TROCAR CAVALETE POR UMA': 240,
    'LIGAÇÃO DE ESGOTO S/V': 240,
    'LIGAÇÃO DE ESGOTO AVULSA S/V': 240,
    'SUBSTITUIR LIGAÇÃO DE ESGOTO': 240,
    'TESTE DE CORANTE OP': 240,
  };

  const date = dateService.split(',')[0];
  const [day, month, year] = date.split('/').map(Number);
  const monthNumber = month - 1;

  const tssDeadline = deadlines[tss] ?? 168;

  const expectedDeadline = add(new Date(year, monthNumber, day, 8, 0), {
    hours: tssDeadline,
  });

  return isAfter(new Date(), expectedDeadline);
};
