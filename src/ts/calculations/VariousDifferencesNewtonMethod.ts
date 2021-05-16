import { Table } from '@ts/calculations/Table';
import { Method } from '@ts/calculations/Method';


/**
 * Метод Ньютона с разделенными разностями.
 */
export class VariousDifferencesNewtonMethod implements Method {

    private xValues: Array<number> = [];
    private yValues: Array<number> = [];


    public calc(table: Table, interpolationPoint: number): number {

        this.xValues = table.getXValues();
        this.yValues = table.getYValues();

        const n = table.size();


        const x = interpolationPoint;

        let result = 0;

        for ( let i = 0; i < n; i++ ) {
            let base = 1;
            const indexes = [0];

            for ( let j = 0; j < i; j++ ) {
                base *= ( x - this.xValues[j]);
                indexes.push(j + 1);
            }

            result += base * this.func(indexes);

        }

        return result;
    }


    /**
     * Counts  f(xi, ..., xi+k).
     *
     * @param {number[]} indexes
     * @return {number}
     * @private
     */
    private func(indexes: number[] ): number {

        const indexesLength = indexes.length;

        if ( indexesLength === 1 ) {
            return this.yValues[indexes[0]];
        } else {
            return ( this.func( indexes.slice(1, indexesLength) ) - this.func( indexes.slice(0, indexesLength - 1)) )
                / ( this.xValues[indexes[indexesLength - 1]] - this.xValues[indexes[0]] );
        }
    }
}