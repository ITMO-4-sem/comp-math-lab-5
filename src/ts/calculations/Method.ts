import { Table } from '@ts/calculations/Table';


export interface Method {

    calc(table: Table, interpolationPoint: number): number

}