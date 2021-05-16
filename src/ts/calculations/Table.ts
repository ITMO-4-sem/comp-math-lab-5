
export class Table {//sdfsdfsd

    private readonly xValues: Array<number>;
    private readonly yValues: Array<number>;


    /**
     *
     * @param {Array<number>} xValues
     * @param {Array<number>} yValues
     * @throws Error if xValues.length != yValues.length
     */
    constructor(xValues: Array<number>, yValues: Array<number>) {

        if ( xValues.length != yValues.length ) {
            throw new Error('xValues and yValues rows must be of the same length.');
        }

        this.xValues = xValues;
        this.yValues = yValues;
    }


    public size(): number {
        return this.xValues.length;
    }


    public getXValues(): Array<number> {
        return this.xValues;
    }


    public getYValues(): Array<number> {
        return this.yValues;
    }
}