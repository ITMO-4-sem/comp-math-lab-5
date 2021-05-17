import '@scss/index.scss'; // is necessary for connecting styles to index.html

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plotly from 'plotly.js-dist';

// import ApexCharts from 'apexcharts';
import { Table } from '@ts/calculations/Table';
import { VariousDifferencesNewtonMethod } from '@ts/calculations/VariousDifferencesNewtonMethod';
import { FiniteDifferencesNewtonMethod } from '@ts/calculations/FiniteDifferencesNewtonMethod';
import { LagrangeMethod } from '@ts/calculations/LagrangeMethod';






const table1 = new Table(
    new Array<number>(0.1, 0.2, 0.3, 0.4, 0.5 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);


const table2 = new Table(
    new Array<number>(0.15, 0.2, 0.33, 0.47, 0.62 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);

const tableA3 = new Table(
    new Array<number>(1.9, 4.12, 5.4 ),
    new Array<number>(0.946, -0.83, -0.773)
);

const tableA8 = new Table(
    new Array<number>(0.3, 0.95, 1.18, 2.39, 3.3, 4, 5.3, 5.76 ),
    new Array<number>(0.296, 0.813, 0.925, 0.683, -0.158, -0.757, -0.832, -0.5)
);

const tableA10 = new Table(
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

let str = '';
for (const l of tableA8Ravnoots.getXValues()) {
     str += Math.sin(l) + ', ';
}

console.log(str);

// **********
const table = tableA8Ravnoots;
// **********
const interpolationPoint = 3.2;


const xValues = table.getXValues();
const yValues = table.getYValues();

console.log('xValues = ', xValues);
console.log('yValues = ', yValues);

const min = Math.min(...xValues);
const max = Math.max(...xValues);



const lagrangeMethod = new LagrangeMethod();
// const lagrangeMethodResult = lagrangeMethod.calc( table1 , interpolationPoint);


const finiteDifNewtonMethod = new FiniteDifferencesNewtonMethod();
// const finiteDifNewtonMethodResult = finiteDifNewtonMethod.calc(table1, interpolationPoint);


const variousDifferencesNewtonMethod = new VariousDifferencesNewtonMethod();
// const variousDifferencesNewtonMethodResult = variousDifferencesNewtonMethod.calc(table1, interpolationPoint);


// ------------------
console.log('l:', lagrangeMethod.calc(table, interpolationPoint));
console.log('v:', variousDifferencesNewtonMethod.calc(table, interpolationPoint));
console.log('f:', finiteDifNewtonMethod.calc(table, interpolationPoint));
// ------------------


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
   finiteDifferencesNewtonMethodYValues.push(  round(finiteDifNewtonMethod.calc(table, i)));

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

const data = [traceBasePoints, traceLagrangeMethod, traceFiniteDifferencesNewtonMethod, traceVariousDifferencesNewtonMethod, traceSinFunction];
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


// ApexCharts
// const options = {
//     series: [{
//         name: 'Points',
//         type: 'scatter',
//
//         //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
//         data: [{
//             x: 1,
//             y: 2.14
//         }, {
//             x: 1.2,
//             y: 2.19
//         }, {
//             x: 1.8,
//             y: 2.43
//         }, {
//             x: 2.3,
//             y: 3.8
//         }, {
//             x: 2.6,
//             y: 4.14
//         }, {
//             x: 2.9,
//             y: 5.4
//         }, {
//             x: 3.2,
//             y: 5.8
//         }, {
//             x: 3.8,
//             y: 6.04
//         }, {
//             x: 4.55,
//             y: 6.77
//         }, {
//             x: 4.9,
//             y: 8.1
//         }, {
//             x: 5.1,
//             y: 9.4
//         }, {
//             x: 7.1,
//             y: 7.14
//         },{
//             x: 9.18,
//             y: 8.4
//         }]
//     }, {
//         name: 'Line',
//         type: 'line',
//         data: [{
//             x: 1,
//             y: 2
//         }, {
//             x: 2,
//             y: 4
//         }, {
//             x: 3,
//             y: 6
//         }, {
//             x: 4,
//             y: 8
//         }, {
//             x: 5,
//             y: 6
//         }, {
//             x: 6,
//             y: 7
//         }, {
//             x: 7,
//             y: 8
//         }, {
//             x: 8,
//             y: 9
//         }, {
//             x: 9,
//             y: 10
//         }, {
//             x: 10,
//             y: 11
//         }]
//     }],
//     stroke: {
//         curve: 'smooth'
//     },
//     chart: {
//         height: 350,
//         type: 'line',
//     },
//     fill: {
//         type:'solid',
//     },
//     markers: {
//         size: [6, 0]
//     },
//     tooltip: {
//         shared: false,
//         intersect: true,
//     },
//     legend: {
//         show: false
//     },
//     xaxis: {
//         type: 'numeric',
//         min: 0,
//         max: 12,
//         tickAmount: 12
//     }
// };
//
// const chart = new ApexCharts(document.querySelector(".plot"), options);
// chart.render();

const pt = 50;


function round(num: number, rounding?: number): number {

    let roundingg = 2;

    if ( rounding ) {
        roundingg = rounding;
    }

    return Number((num).toFixed(roundingg)); // 6.7
}