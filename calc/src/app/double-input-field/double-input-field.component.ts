import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-double-input-field',
  templateUrl: './double-input-field.component.html',
  styleUrls: ['./double-input-field.component.css']
})
export class DoubleInputFieldComponent {

  @Input() sliderValue: number = 1;
  @Input() labelTitle: string = '';
  @Input() unit: string = '';
  @Input() sliderMin: number = 10;
  @Input() sliderMax: number = 100;

  years: string = "roky";
  months: string = "mesiace";

  /*
    Emitter sluzi na komunikaciu s rodicom
  */
 
  @Output() valueChange = new EventEmitter<number>();
  
  onValueChange() {    
    this.valueChange.emit(this.sliderValue);
  }  
  /**
   * Pre 2 input fieldy prepocitam zvlast roky a mesiace - pouzitie v html pri inpute
   * input params: none
   * return: rok, mesiac
   * * */
  getYearsAndMonths(): { years: number; months: number } {
 
    const years = Math.floor(this.sliderValue / 12);
    const months = this.sliderValue % 12;
    this.formatGrammar(years, months);
    return { years, months };
  }
/**
 * Funkcia prepisuje gramaticky spravne roky a mesiace v input fielde 
 */
  formatGrammar(years: number, months: number):void{
    if(years == 1){
      this.years = "rok";
    }else if(years==2 || years ==3 || years ==4){
      this.years = "roky";
    }else if(years==0 || years>4){
      this.years = "rokov";
    }

    if(months == 1){
      this.months = "mesiac";
    }else if(months==2 || months ==3 || months ==4){
      this.months = "mesiace";
    }else if(months==0 || months>4){
      this.months = "mesiacov";
    }

  }

}
