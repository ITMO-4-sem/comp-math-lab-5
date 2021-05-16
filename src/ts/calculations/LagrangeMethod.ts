import { Table } from '@ts/calculations/Table';
import { Method } from '@ts/calculations/Method';


export class LagrangeMethod implements Method {


    public getLatexExpression(): string {
        return 'no no no';
        // (x - 2) * (x - 8) / ( () * () )
    }


    public calc(table: Table, interpolationPoint: number): number {

        const xValues = table.getXValues();
        const yValues = table.getYValues();
        
        const x = interpolationPoint;

        const n: number = table.size();
        let Lx: number = 0;

        for ( let i = 0; i < n; i++ ) {
            
            let li = 1;
            
            for ( let j = 0; j < n; j++ ) {
                
                if ( i === j ) {
                    continue;
                }
                li *= ( x - xValues[j] ) / ( xValues[i] - xValues[j] );
            }
            
            Lx += yValues[i] * li;
            
        }


        return Lx;
    }
}