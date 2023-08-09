interface DataEntry {
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

  export interface DataSet {
    name: string;
    series: BarValeus[];
  }

  export interface BarValeus {
    name: string;
    value: number;
  }