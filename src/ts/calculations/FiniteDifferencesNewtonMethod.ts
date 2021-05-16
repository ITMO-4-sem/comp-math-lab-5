import { Table } from '@ts/calculations/Table';
import { Method } from '@ts/calculations/Method';


export class FiniteDifferencesNewtonMethod implements Method {

    private xValues: Array<number> = [];
    private yValues: Array<number> = [];
    private n: number = 0;


    public calc(table: Table, interpolationPoint: number): number {

        this.xValues = table.getXValues();
        this.yValues = table.getYValues();
        this.n = table.size();

        const x = interpolationPoint;

        const h = (this.xValues[1] - this.xValues[0]);

        const finiteDifferences = this.calcFiniteDifferences(this.n)[0];

        let base = 1;
        let accum = 0;

        for ( let i = 0; i < this.n; i++ ) {
            accum += finiteDifferences[i] * base;

            base *= (x - this.xValues[i]) / (h * (i + 1));
        }


        return accum;

    }


    private calcFiniteDifferences(k: number): Array<Array<number>> {

        const table = new Array<Array<number>>();

        table.push( this.yValues );

        // Таблица изначально повернута относительно расчетной таблицы в презентации
        // на 90 градусов для более удобной работы с ней в программе.
        for ( let j = 0; j < k; j++ ) { // not sure about  k + 1
            const tmpArr = new Array<number>();
            for ( let l = 0; l < k - j; l++ ) {
                tmpArr.push(
                    table[j][l + 1] - table[j][l]
                );
            }
            table.push(tmpArr);
        }

        // Rotate the table 90 degrees
        const finiteDifferences = new Array<Array<number>>();

        for ( let j = 0; j < k + 1; j++ ) {
            const tmpArr = new Array<number>();
            for ( let l = 0; l < k - j + 1; l++ ) {
                tmpArr.push(
                    table[l][j]
                );
            }
            finiteDifferences.push( tmpArr );
        }

        return finiteDifferences;

    }


    // private factorial(num: number) {
    //     let value = 1;
    //     for (let i = 2; i <= num; i++)
    //         value = value * i;
    //     return value;
    // }
}