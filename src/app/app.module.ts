import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialConfigModule } from './shared/materialConfig.module';
import { DialogBoxComponent } from '@components/dialog-box/dialog-box.component';
import { ContactListComponent } from '@components/contact-list/contact-list.component';
@NgModule({
  declarations: [AppComponent, ContactListComponent, DialogBoxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialConfigModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DialogBoxComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
