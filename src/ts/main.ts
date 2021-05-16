import { LagrangeMethod } from '@ts/calculations/LagrangeMethod';
import { Table } from '@ts/calculations/Table';
import { VariousDifferencesNewtonMethod } from '@ts/calculations/VariousDifferencesNewtonMethod';
import { FiniteDifferencesNewtonMethod } from '@ts/calculations/FiniteDifferencesNewtonMethod';


const table1 = new Table(
    new Array<number>(0.1, 0.2, 0.3, 0.4, 0.5 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);


const table2 = new Table(
    new Array<number>(0.15, 0.2, 0.33, 0.47, 0.62 ),
    new Array<number>(1.25, 2.38, 3.79, 5.44, 7.14)
);


const table3 = new Table(
    new Array<number>(1.10, 1.25, 1.40, 1.55, 1.70, 1.85, 2.00 ),
    new Array<number>(0.2234, 1.2438, 2.2644, 3.2984, 4.3222, 5.3516, 6.3867)
);

// const lagrangeMethod = new LagrangeMethod();
// const interpolationPoint = 0.35;
//
// const lagrangeMethodResult = lagrangeMethod.calc( table1 , interpolationPoint);
//
//
// console.log('lagrangeMethodResult = ', lagrangeMethodResult);


// -----------------------------------


// const diffNewtonMethod = new VariousDifferencesNewtonMethod();
// const diffNewtonMethodResult = diffNewtonMethod.calc(table2, 0.22);
//
// console.log('diffNewtonMethod = ', diffNewtonMethodResult);


const finiteDifNewtonMethod = new FiniteDifferencesNewtonMethod();
const finiteDifNewtonMethodResult = finiteDifNewtonMethod.calc(table1, 0.47);
console.log('finiteDifNewtonMethodResult = ', finiteDifNewtonMethodResult);
