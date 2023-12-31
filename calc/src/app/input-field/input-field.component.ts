import { Component, Input, Output, EventEmitter} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider'; // Importujte MatSliderModule


@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {

  @Input() sliderValue: number = 1;
  @Input() labelTitle: string = '';
  @Input() unit: string = '';
  @Input() sliderMin: number = 10;
  @Input() sliderMax: number = 100;
  @Input() step: number = 100;
  @Input() disabledValue: boolean = false;
  @Input() popUp: string = '';
  

  /*
    Emitter sluzi na komunikaciu s rodicom
  */
 
  @Output() valueChange = new EventEmitter<number>();
  
  onValueChange() {    
    this.valueChange.emit(this.sliderValue);
  }  
}


