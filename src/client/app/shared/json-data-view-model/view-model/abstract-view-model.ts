import { FieldMap, ObjectMap, TypedPointer } from './../data-view-translator';

export const dontSetDetfaults: boolean = false;

export abstract class AbstractViewModel {
    public startDate: string | any;
    public endDate: string | any;
    public dateInserted: string;
    public dateDeleted: string;
    public deletedReason: string;
    public isDeleted: boolean = false;

    /**
     * Mapping to/from Data and View model fields.  See createFieldMappings().
     */
    private objectMap = new ObjectMap();

    public getObjectMap(): ObjectMap {
        return this.objectMap;
    }

    constructor(setDefaults: boolean = true) {
        if (setDefaults) {
            this.setDefaultValues();
            this.addSuperFieldMappings();
        }
        this.createFieldMappings();
    }

     /**
     * Client calls this for each data/view field mappings to build objectMap.
     *
     * @param dataPath - path in the data model
     * @param dataPathType - type of data in that path
     * @param viewPath - path in the view model
     * @param viewPathType - type of data in that path
     * @returns {FieldMaps}
     */
    addFieldMapping(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string): void {
        if (dataPath.length === 0 || dataPathType.length === 0 || viewPath.length === 0 || viewPathType.length === 0) {
            throw new Error('expecting 4 data items - dataPath, dataPathType, viewPath, viewPathType');
        }
        this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

        let dataTypePointer: TypedPointer = new TypedPointer(dataPath, dataPathType);
        let viewTypePointer: TypedPointer = new TypedPointer(viewPath, viewPathType);
        this.objectMap.add(new FieldMap(dataTypePointer, viewTypePointer));
    }

    /**
     * Setup common field mappings
     */
    addSuperFieldMappings(): void {
        this.addFieldMapping('/dateDeleted/value/0', 'string', '/dateDeleted', 'string');
        this.addFieldMapping('/dateInserted/value/0', 'string', '/dateInserted', 'string');
        this.addFieldMapping('/deletedReason', 'string', '/deletedReason', 'string');
    }

    /**
     * Simple way to specify the data / view model mappings.
     * @returns string[][]
     */
    public abstract createFieldMappings(): void;

    private setDefaultValues() {
        this.dateDeleted = null;
        this.dateInserted = null;
        this.deletedReason = null;
        this.startDate = null;
        this.endDate = null;
    }

    private assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
      // TODO: where is assert? They should be in a unit test anyway.
        // assert(dataPath.match(/\/.*/));
        // assert(dataPathType.match(/number|string/));
        // assert(viewPath.match(/\/.*/));
        // assert(viewPathType.match(/number|string/));
    }
}
