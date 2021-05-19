import '@scss/index.scss'; // is necessary for connecting styles to index.html

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plotly from 'plotly.js-dist';

// import ApexCharts from 'apexcharts';
import { Table } from '@ts/calculations/Table';
import { VariousDifferencesNewtonMethod } from '@ts/calculations/VariousDifferencesNewtonMethod';
import { FiniteDifferencesNewtonMethod } from '@ts/calculations/FiniteDifferencesNewtonMethod';
import { LagrangeMethod } from '@ts/calculations/LagrangeMethod';



const elForm = document.querySelector('.form') as HTMLFormElement;
const elInterpolationPointValueLagrange = document.querySelector('.interpolation-point-value-lagrange') as HTMLSpanElement;
const elInterpolationPointValueNewtonFiniteDifferences = document.querySelector('.interpolation-point-value-newton-finite-differences') as HTMLSpanElement;
const elInterpolationPointValueNewtonVariousDifferences = document.querySelector('.interpolation-point-value-newton-various-differences') as HTMLSpanElement;




const table1 = new Table(
    new Array<number>(0.1, 0.2, 0.3, 0.4, 0.5 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);


const table2 = new Table(
    new Array<number>(0.15, 0.2, 0.33, 0.47, 0.62 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);

const tableThree = new Table(
    new Array<number>(1.9, 4.12, 5.4 ),
    new Array<number>(0.946, -0.83, -0.773)
);

const tableEight = new Table(
    new Array<number>(0.3, 0.95, 1.18, 2.39, 3.3, 4, 5.3, 5.76 ),
    new Array<number>(0.296, 0.813, 0.925, 0.683, -0.158, -0.757, -0.832, -0.5)
);

const tableTenOne = new Table(
    new Array<number>(5,      0.8,   3.2,    4,      2.7,    2.2,  3.7,    1.8,    4.4,    1.9 ),
    new Array<number>(-0.958, 0.717, -0.058, -0.757, 0.427, 0.808, -0.529, 0.973, -0.951, 0.946)
);

const tableTenTwo = new Table(
    new Array<number>(15, 0.8, 9.03, 4, 13.3, 2.2, 6.7, 11.8, 18.4, 21.2 ),
    new Array<number>(0.65, 0.717, 0.385, -0.757, 0.67, 0.808, 0.405, -0.694, -0.435, 0.711)
);


const tableSQR = new Table(
    new Array<number>(1, 2, 3, 4, 5, 6 ),
    new Array<number>(1, 4, 9, 16, 25, 36)
);


const tableA8Ravnoots = new Table(
    new Array<number>(1, 2, 3, 4, 5, 6, 7, 8),
    new Array<number>(0.8414709848078965, 0.9092974268256817, 0.1411200080598672, -0.7568024953079282, -0.9589242746631385, -0.27941549819892586, 0.6569865987187891, 0.9893582466233818, )
);




elForm.addEventListener('submit', (e) => {
    const formData: FormData = new FormData(elForm);

    const interpolationPoint = formData.get('interpolation-point') as string;
    const tableString = formData.get('table') as string;
    const preset = formData.get('preset');

    let drawSinFunc: boolean = true;

    let table: Table | undefined;

    try {
        if ( preset === 'none' ) {
            table = prepareTableFromInput( tableString );
            drawSinFunc = false;
        } else {
            switch (preset) {
                case 'three': {
                    table = tableThree;
                    break;
                }
                case 'eight': {
                    table = tableEight;
                    break;
                }
                case 'ten-one': {
                    table = tableTenOne;
                    break;
                }
                case 'ten-two': {
                    table = tableTenTwo;
                    break;
                }
                default: {
                    throw new Error( `Got undefined "preset" value: "${preset}".` );
                }
            }
        }

        if ( ! isNumeric(interpolationPoint)) {
            throw new Error('Invalid interpolation point value type. Float number' +
                ' expected.');
        }

        main(table, parseFloat(interpolationPoint), drawSinFunc);

    } catch (e) {
        showNotification(e);
    }

    e.preventDefault();




});


function main(table: Table, interpolationPoint: number, drawSinFunc: boolean): void {

    const isTableAppropriateForFiniteDifferencesNewtonMethodResult: boolean = isTableAppropriateForFiniteDifferencesNewtonMethod(table);

    const xValues = table.getXValues();
    const yValues = table.getYValues();


    const min = Math.min(...xValues);
    const max = Math.max(...xValues);



    const lagrangeMethod = new LagrangeMethod();

    const finiteDifNewtonMethod = new FiniteDifferencesNewtonMethod();

    const variousDifferencesNewtonMethod = new VariousDifferencesNewtonMethod();


    const plotXValues = new Array<number>();
    const lagrangeMethodYValues = new Array<number>();
    const variousDifferencesNewtonMethodYValues = new Array<number>();
    const finiteDifferencesNewtonMethodYValues = new Array<number>();

    const sinFunctionYValues = new Array<number>();

    const offset = 0.1;
    const step = 0.05;


    for ( let i = min - offset ; i < max + offset; i += step ) {
        plotXValues.push(i);
        lagrangeMethodYValues.push( round(lagrangeMethod.calc(table, i) ));
        variousDifferencesNewtonMethodYValues.push( round(variousDifferencesNewtonMethod.calc(table, i) ));

        if ( isTableAppropriateForFiniteDifferencesNewtonMethodResult ) {
            finiteDifferencesNewtonMethodYValues.push( round( finiteDifNewtonMethod.calc( table, i ) ) );
        }

        sinFunctionYValues.push( round(Math.sin(i)));
    }



    console.log('l y', lagrangeMethodYValues);
    console.log('v y', variousDifferencesNewtonMethodYValues);
    console.log('f y', finiteDifferencesNewtonMethodYValues);

    const traceLagrangeMethod = {
        x: plotXValues,
        y: lagrangeMethodYValues,
        mode: 'lines',
        type: 'scatter',
        name: 'Инт-я Лагранжа'
    };

    const traceFiniteDifferencesNewtonMethod = {
        x: plotXValues,
        y: finiteDifferencesNewtonMethodYValues,
        mode: 'lines',
        type: 'scatter',
        name: 'Инт-я Ньютона с конечн. разн.'

    };

    const traceVariousDifferencesNewtonMethod = {
        x: plotXValues,
        y: variousDifferencesNewtonMethodYValues,
        mode: 'lines',
        type: 'scatter',
        name: 'Инт-я Ньютона с раздел. разн.'

    };

    const traceBasePoints = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        name: 'Исх точки',
        marker: {
            color: 'rgb(255, 217, 102)',
            size: 12
        },
    };

    const traceSinFunction = {
        x: plotXValues,
        y: sinFunctionYValues,
        mode: 'lines',
        type: 'scatter',
        name: 'sin(x)'
    };

// const trace3 = {
//     x: [1, 2, 3, 4],
//     y: [12, 9, 15, 12],
//     mode: 'lines+markers',
//     type: 'scatter'
// };

    const data = [traceBasePoints, traceLagrangeMethod, traceVariousDifferencesNewtonMethod];

    if ( isTableAppropriateForFiniteDifferencesNewtonMethodResult ) {
        data.push(traceFiniteDifferencesNewtonMethod);
    }

    if ( drawSinFunc ) {
        data.push(traceSinFunction);
    }

    const layout = {
        title: 'Интерполяция',
        // autosize: false,
        // width: 500,
        // height: 500,
        xaxis: {
            title: {
                text: 'x'
            }
        },
        yaxis: {
            title: {
                text: 'F(x)'
            }
        }
    };

    const options = {
        scrollZoom: true,
        displayModeBar: false,
        responsive: true
    };
    Plotly.newPlot(document.querySelector('.plot'), data, layout, options);


    // ------------------
    setInterpolationPointValueLagrange(lagrangeMethod.calc(table, interpolationPoint));
    setInterpolationPointValueNewtonVariousDifferences(variousDifferencesNewtonMethod.calc(table, interpolationPoint));

    if ( isTableAppropriateForFiniteDifferencesNewtonMethodResult ) {
        setInterpolationPointValueNewtonFiniteDifferences( finiteDifNewtonMethod.calc( table, interpolationPoint ) );
    } else {
        setInterpolationPointValueNewtonFiniteDifferences(undefined);
    }
    // ------------------
}


function prepareTableFromInput(input: string): Table {
    const tmp: Array<string> = input.trim().split('\n');
    if ( tmp.length != 2) {
        throw new Error('Входные данные должны состоять из 2 строк');
    }

    const tmpX = tmp[0].trim().split(' ');
    const tmpY = tmp[1].trim().split( ' ');


    if ( tmpX.length != tmpY.length) {
        throw new Error('Количество иксов должно быть равно количеству игреков');
    }

    const xValues: Array<number> = new Array<number>();
    const yValues: Array<number> = new Array<number>();

    for ( const x of tmpX) {
        if ( ! isNumeric(x)) {
            throw new Error('Неправильный x: ' + x);
        }
        xValues.push(parseFloat(x));
    }

    for ( const y of tmpY ) {
        if ( ! isNumeric(y)) {
            throw new Error('Неправильный y: ' + y);
        }
        yValues.push(parseFloat(y));
    }

    return new Table(xValues, yValues);

}


function round(num: number, rounding?: number): number {

    let roundingg = 3;

    if ( rounding ) {
        roundingg = rounding;
    }

    return Number((num).toFixed(roundingg)); // 6.7
}


function showNotification(constent: any): void { // Простите меня, Письмак
    alert(constent); // del
}




function setInterpolationPointValueLagrange(value: any | undefined): void {

    let val = value;

    if ( value === undefined ) {
        val = '?';
    }

    elInterpolationPointValueLagrange.innerText = val;
}


function setInterpolationPointValueNewtonFiniteDifferences(value: any | undefined): void {

    let val = value;

    if ( value === undefined ) {
        val = '?';
    }

    elInterpolationPointValueNewtonFiniteDifferences.innerText = val;
}


function setInterpolationPointValueNewtonVariousDifferences(value: any | undefined): void {

    let val = value;

    if ( value === undefined ) {
        val = '?';
    }

    elInterpolationPointValueNewtonVariousDifferences.innerText = val;
}


function isTableAppropriateForFiniteDifferencesNewtonMethod(table: Table): boolean {

    const xValues = table.getXValues();
    const diff = xValues[1] - xValues[0];

    for ( let i = 2; i < xValues.length; i++ ) {
        if ( xValues[i] - xValues[i - 1] != diff ) {
            return false;
        }
    }

    return true;
}


function isNumeric(str: string | number): boolean {
    if (typeof str != "string") return false; // we only process strings!
    return !isNaN(Number( str )) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}