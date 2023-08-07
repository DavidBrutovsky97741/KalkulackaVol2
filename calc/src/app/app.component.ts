import { Component, ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { DataGroup, DataPie, DataEntry } from '../assets/interfaces'; // Import interfaces from the new file

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';
  
  view: [number, number] = [500, 300];
  public KIS: number = 10;
  public CZ: number = 20;

  customLabel: string = "Spolu";

  pieChartcustomColors = [
    { name: "Spolu investované", value: '#302841' },
    { name: "Čistý zisk", value: '#fbc910' }
  ];  

  /*
  *** Datove bloky pre vytvorenie sliderov  ***
  */

  arrayList: DataGroup[] = [
    {
      name: "Ročný výnos",
      type: "single",
      data: [
        {
          unit: "%",
          min: 0,
          max: 10,
          value: 5
        }
      ]
    },
    {
      name: "Finančný cieľ",
      type: "single",
      data: [
        {
          unit: "€",
          min: 0,
          max: 1000000,
          value: 10
        }
      ]
    },
    {
      name: "Aktuálny stav úspor",
      type: "single",
      data: [
        {
          unit: "€",
          min: 0,
          max: 1000000,
          value: 10
        }
      ]
    },
    {
      name: "Dĺžka sporenia",
      type: "double",
      data: [
        {
          unit: "roky",
          min: 0,
          max: 360, // vsutp je pocet mesiacov 30*12
          value: 10
        }
      ]
    },
    {
      name: "Mesačný vklad",
      type: "single",
      data: [
        {
          unit: "€",
          min: 0,
          max: 10000,
          value: 10
        }
      ]
    }
  ];

  public pieChartData: DataPie[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  /**
   * Init component
   */
  public ngOnInit(): void {
    this.pieChartData = <DataPie[]>[
      {
        "name": "Čistý zisk",
        "value": this.CZ
      },
      {
        "name": "Spolu investované",
        "value": this.KIS
      }];
  }

  /*
  * Funkcia na odchytenie hodnoty v danom slidery
  * TODO : prepisovat arrayListy pre grafy TU
  */

  onFieldValueChange(value: number, name: string): void {

    let arrLen =  this.arrayList.length;

    for(let i=0; i<arrLen; i++){
      if(this.arrayList[i].name === name){
        this.arrayList[i].data[0].value = value;
      }
    }

    this.KIS = this.totalInvested();
    this.CZ = this.profit();

    this.pieChartData = <DataPie[]>[
      {
        "name": "Čistý zisk",
        "value": this.CZ
      },
      {
        "name": "Spolu investované",
        "value": this.KIS
      }
    ]

    console.log('klik');
    this.changeDetectorRef.detectChanges();

  }

    totalInvested(): number{ 
      let moneyInput = this.arrayList[2].data[0].value;
      let numOfMonths = this.arrayList[3].data[0].value;
      let deposit = this.arrayList[4].data[0].value;      

      return numOfMonths * deposit + moneyInput;
    }

    profit(): number{
      let yearRevenue = this.arrayList[0].data[0].value;
      let financialGoal = this.arrayList[1].data[0].value;
      let moneyInput = this.arrayList[2].data[0].value;
      let numOfMonths = this.arrayList[3].data[0].value;
      let deposit = this.arrayList[4].data[0].value;

      let x = yearRevenue/100/12;

      let y = deposit * ((Math.pow(1 + x, numOfMonths) - 1) / x) * (1 + x);

      y = y - this.KIS;
      return y;
    }
  

 }


