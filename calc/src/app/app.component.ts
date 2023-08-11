import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DataGroup, DataPie, DataSet, BarValeus, Car } from '../assets/interfaces'; // Import interfaces from the new file
import { Color, ScaleType } from '@swimlane/ngx-charts'

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calc';
  selectedCar: string = 'FC'
  public KIS: number = 10; // kumulativ investovanych penazi
  public CZ: number = 20; // Cisty zisk

  cars: Car[] = [
    { value: 'RV', viewValue: 'Ročný výnos' },
    { value: 'FC', viewValue: 'Finančný cieľ' },
    { value: 'AS', viewValue: 'Aktuálny stav úspor' },
    { value: 'DI', viewValue: 'Dĺžka investovania' },
    { value: 'MV', viewValue: 'Mesačný vklad' },
  ];

  monthlyValuesKIS: number[] = [];
  monthlyValuesCZ: number[] = [];

  customLabel: string = "Spolu"; // pie chart custom label

  /**
   * data pre charty
   */
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  timeline: boolean = true;

  customColorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#fbc910', '#302841']
  };
  pieChartcustomColors = [
    { name: "Spolu investované", value: '#302841' },
    { name: "Čistý zisk", value: '#fbc910' }
  ];

  public arrayList: DataGroup[] = [];
  public pieChartData: DataPie[] = [];
  public lineChartData: DataSet[] = [];
  
  constructor(private changeDetectorRef: ChangeDetectorRef) { }  

  /**
   * Init component
  */
 public ngOnInit(): void {
   
   /*
   *** Datovy blok pre vytvorenie sliderov  ***
   */
   
   this.arrayList = <DataGroup[]>[
     {
       name: "Ročný výnos",
       type: "single",
       data: [
         {
           unit: "%",
           min: 0,
           max: 10,
           value: 5,
           step: 0.1,
           disabled: false,
           
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
            value: 10,
            step: 1,
            disabled: true,
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
            value: 10,
            step: 1,
            disabled: false,

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
            value: 15,
            step: 1,
            disabled: false,

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
            value: 200,
            step: 1,
            disabled: false,

          }
        ]
      }
    ];

    this.KIS = this.totalInvested();
    this.CZ = this.profit();

    this.changeDetectorRef.detectChanges();

    this.lineChartData = <DataSet[]>[
      {
        "name": "KIS",
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      },

      {
        "name": "CZ",
        "series": [
          {
            "name": "2010",
            "value": 7870000
          },
          {
            "name": "2011",
            "value": 8270000
          }
        ]
      }

    ];

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
*/

  onFieldValueChange(value: number, name: string): void {

     let arrLen = this.arrayList.length;

     for (let i: number = 0; i < arrLen; i++) {
       if (this.arrayList[i].name === name) {
         this.arrayList[i].data[0].value = value;
       }
      }
      
     this.KIS = this.totalInvested();
     this.CZ = this.profit();

     let KISdata: BarValeus[] = this.KISvalues();
     let CZdata: BarValeus[] = this.CZvalues();
     
     this.lineChartData = <DataSet[]>[
       {
         "name": "Čistý zisk",
         "series": CZdata
       },
       {
         "name": "Spolu investované",
         "series": KISdata
       }
     ];


   this.arrayList[1].data[0].value = this.KIS + this.CZ; // THIS HOW

     this.pieChartData = <DataPie[]>[
       {
         "name": "Čistý zisk",
         "value": this.CZ
       },
       {
         "name": "Spolu investované",
         "value": this.KIS
       }
     ];

    this.changeDetectorRef.detectChanges();

  }
  /**
   * Funkcia na vypocet investovanych penazi
   * @returns vypocet investovanych penazi
   * prepisuje taktiez monthlyValuesKIS string[] kde vklada jednotlive mesacne hodnoty
   * 
  */
  totalInvested(): number {
    let moneyInput: number = this.arrayList[2].data[0].value;
    let numOfMonths: number = this.arrayList[3].data[0].value;
    let deposit: number = this.arrayList[4].data[0].value;

    this.monthlyValuesKIS = [];

    for (let i: number = 1; i < numOfMonths+1; i++) {
      this.monthlyValuesKIS.push(i * deposit + moneyInput);
    }
    return numOfMonths * deposit + moneyInput;
  }
  /**
   * Funkcia na vypocet cisteho zisku
   * prepisuje taktiez monthlyValuesCZ string[] kde vklada jednotlive mesacne hodnoty
   * @returns vypocet cisteho zisku
   * 
  */
  profit(): number {
    let yearRevenue: number = this.arrayList[0].data[0].value;
    let financialGoal: number = this.arrayList[1].data[0].value;
    let moneyInput: number = this.arrayList[2].data[0].value;
    let numOfMonths: number = this.arrayList[3].data[0].value;
    let deposit: number = this.arrayList[4].data[0].value;

    this.monthlyValuesCZ = [];

    let x: number = yearRevenue / 100 / 12;
    let y: number = deposit * ((Math.pow(1 + x, numOfMonths) - 1) / x) * (1 + x);
    y = y - this.KIS;
    let z: number = moneyInput * Math.pow(1 + x, numOfMonths);

    //mesacny prirastok ulozeny v arrayliste
    for (let i: number = 1; i < numOfMonths+1; i++) {
      let q: number = yearRevenue / 100 / 12;
      let w: number = deposit * ((Math.pow(1 + q, i) - 1) / q) * (1 + q);
      let r: number = moneyInput * Math.pow(1 + q, i);

      this.monthlyValuesCZ.push(r + w);
    }

    return z + y;
  }
  /**
   * Funkcia na formatovanie hodnot v labeloch v pie charte
   * @param value hodnota ktoru treba sformatovat
   * 
   * @returns foramtovany vystup pre pie chart s eurami
  */
  formatValue(value: number): string {
    const formattedValue: string = value.toFixed(2).replace(',', '.');

    const parts: string[] = formattedValue.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return `${parts.join(' ')} €`;
  }

  formatEUR(value: number): string {
    return `${value} €`;
  }

  /**
   * Funkcia na vypocet investovanych penazi
   * @returns investovanych penazi: BarValeus[] 
   * 
  */
  KISvalues(): BarValeus[] {
    const currentDate: Date = new Date();
    const currentMonth: number = currentDate.getMonth() + 1;
    const currentYear: number = currentDate.getFullYear();
    
    let numOfMonths: number = this.arrayList[3].data[0].value;
    let newSeries: BarValeus[] = [];
    for (let i: number = 0; i < numOfMonths-1; i++) {
      const month: number = (currentMonth + i) % 12 || 12;
      const year: number = currentYear + Math.floor((currentMonth + i - 1) / 12);
      
      const barValue: BarValeus = {
        name: `${month}.${year}`,
        value: this.monthlyValuesKIS[i]
      };
      newSeries.push(barValue);
    }
    
    return newSeries;
  }

  /**
   * Funkcia na vypocet cisteho zisku
   * @returns cistyzisk: BarValeus[] 
   * 
   */
  CZvalues(): BarValeus[] {
    const currentDate: Date = new Date();
    const currentMonth: number = currentDate.getMonth() + 1;
    const currentYear: number = currentDate.getFullYear();

    
    let numOfMonths: number = this.arrayList[3].data[0].value;
    let newSeries: BarValeus[] = [];
        
    for (let i: number = 0; i < numOfMonths-1; i++) {
      const month: number = (currentMonth + i) % 12 || 12;
      const year: number = currentYear + Math.floor((currentMonth + i - 1) / 12);
      
      const barValue: BarValeus = {
        name: `${month}.${year}`,
        value: this.monthlyValuesCZ[i]
      };
      newSeries.push(barValue);
    }

    return newSeries;

  }
/**
 * Funkcia nastavuje slider na disabled podla vyberu moznosti vypocitania
 * 
 */
  onCarSelectionChange() {
    let value: string = this.selectedCar;

    //najprv si vsetky hodnoty nastavim na disable = false 
    for (let i: number = 0; i < this.arrayList.length; i++) {
      this.arrayList[i].data[0].disabled = false;
    }
    //potom na zaklade zvolenej ju nastavim na true
    switch (value) {
      case "RV":
        this.arrayList[0].data[0].disabled = true;
        break;
      case "FC":
        this.arrayList[1].data[0].disabled = true;
        break;
      case "AS":
        this.arrayList[2].data[0].disabled = true;
        break;
      case "DI":
        this.arrayList[3].data[0].disabled = true;
        break;
      case "MV":
        this.arrayList[4].data[0].disabled = true;
        break;
    }
  }

}


