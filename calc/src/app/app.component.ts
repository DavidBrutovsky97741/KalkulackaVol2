import { Component, ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

 // interface pre upresnenie datovych 
  //                  typov pre array

interface DataEntry {
  unit: string;
  min: number;
  max: number;
}

interface DataGroup {
  name: string;
  data: DataEntry[];
}

interface DataPie {
  name: string;
  value: number;
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';  

  
  view: [number, number] = [380, 300];
  KIS: number = 10;
  CZ: number = 20;

  
  /* 
  *** Datove bloky pre vytvorenie sliderov  ***
  */

  arrayList: DataGroup[] = [
    {
      name: "Ročný výnos",
      data: [
        {
          unit: "%",
          min: 0,
          max: 10
        }
      ]
    },
    {
      name: "Finančný cieľ",
      data: [
        {
          unit: "€",
          min: 0,
          max: 1000000
        }
      ]
    },
    {
      name: "Aktuálny stav úspor",
      data: [
        {
          unit: "€",
          min: 0,
          max: 1000000
        }
      ]
    },
    {
      name: "Dĺžka sporenia",
      data: [
        {
          unit: "roky",
          min: 0,
          max: 30
        }
      ]
    },
    {
      name: "Mesačný vklad",
      data: [
        {
          unit: "€",
          min: 0,
          max: 10000
        }
      ]
    }
  ];

  productSales : DataPie[] = [
    {
      "name" : "Čisltý zisk",
      "value": 10
    },
    {
      "name" : "Kumulatív investovaných peňazí",
      "value": 20
    }
  ];



  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  /*
  Funkcia na odchytenie hodnoty v danom slidery
  TODO : prepisovat arrayListy pre grafy TU
  */

  onFieldValueChange(value: number, name: string): void {
    this.CZ ++ ;
    this.KIS -- ;
    console.log(this.productSales[0].value);

    this.changeDetectorRef.detectChanges();
  }

  klikacka(){
    this.productSales[0].value ++;
    this.productSales[1].value --;

    console.log('Q');
    this.changeDetectorRef.detectChanges();
  }
  
 }

 
