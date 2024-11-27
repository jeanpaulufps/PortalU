import { useRef, useEffect, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';

const Calculator = ({ subjects }) => {
  const containerRef = useRef(null);

  const [data, setData] = useState(subjects);

  const parseToNumber = (n) => (Number.isNaN(Number(n)) ? 0 : n);

  const calculateDef = (row) => {
    const firstP = parseToNumber(row[4]);
    const secondP = parseToNumber(row[5]);
    const thirdP = parseToNumber(row[6]);
    const ex = parseToNumber(row[7]);

    if (firstP !== '' && secondP !== '' && thirdP !== '' && ex !== '') {
      const avg =
        (parseFloat(firstP) +
          parseFloat(secondP) +
          parseFloat(thirdP) +
          parseFloat(ex)) /
        4;
      return avg.toFixed(2);
    }
    return '';
  };

  const container = useRef();

  useEffect(() => {
    const hot = new Handsontable(containerRef.current, {
      data: data,
      colHeaders: [
        'Código',
        'Nombre',
        'Créditos',
        'Semestre',
        '1P',
        '2P',
        '3P',
        'EX',
        'DEF',
      ],
      columns: [
        { readOnly: true },
        { readOnly: true },
        { readOnly: true },
        { readOnly: true },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { type: 'numeric' },
        { readOnly: true, renderer: 'html' },
      ],
      afterChange: (changes, source) => {
        if (source === 'edit') {
          // Cuando hay un cambio, actualizamos la columna 'DEF'
          const updatedData = [...data];
          changes.forEach(([row, col]) => {
            if ([4, 5, 6, 7].includes(col)) {
              updatedData[row][8] = calculateDef(updatedData[row]);
            }
          });
          setData(updatedData);
        }
      },
      licenseKey: 'non-commercial-and-evaluation',
      colWidths: container.current.offsetWidth / 9,

      height: 'auto',
    });

    return () => {
      hot.destroy();
    };
  }, [data]);

  return (
    <div ref={container}>
      <div ref={containerRef}></div>
    </div>
  );
};

export default Calculator;
