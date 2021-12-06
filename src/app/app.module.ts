import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from './dialog/dialog.module';
import { ExampleComponent } from './example/example.component';
import { ValidateComponent } from './validate/validate.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    ValidateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
