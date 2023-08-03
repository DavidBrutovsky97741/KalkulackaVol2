import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InputFieldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    NgxChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
