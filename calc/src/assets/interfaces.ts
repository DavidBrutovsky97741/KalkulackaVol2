export interface DataEntry {
    unit: string;
    min: number;
    max: number;
    value: number;
  }
  
  export interface DataGroup {
    name: string;
    type: string,
    data: DataEntry[];
  }
  
  export interface DataPie {
    name: string;
    value: number;
  }