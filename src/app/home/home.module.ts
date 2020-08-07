import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';

import {HomePageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {SwagCardComponent} from './swag-card/swag-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, SwagCardComponent]
})
export class HomePageModule {
}
