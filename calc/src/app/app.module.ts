import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { MatInputModule } from '@angular/material/input';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { DoubleInputFieldComponent } from './double-input-field/double-input-field.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent,
    DoubleInputFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    NgxChartsModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
