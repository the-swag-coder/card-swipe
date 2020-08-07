import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cardList = [];

  constructor() {
    this.getCardList();
  }

  getCardList(): void {
    this.cardList = [
      {
        icon: 'https://img.icons8.com/color/100/000000/facebook.png',
        name: 'Facebook'
      },
      {
        icon: 'https://img.icons8.com/color/100/000000/twitter.png',
        name: 'Twitter'
      },
      {
        icon: 'https://img.icons8.com/cute-clipart/100/000000/instagram-new.png',
        name: 'Instagram'
      },
      {
        icon: 'https://img.icons8.com/plasticine/100/000000/youtube.png',
        name: 'Youtube'
      },
      {
        icon: 'https://img.icons8.com/color/100/000000/whatsapp.png',
        name: 'Whats app'
      }
    ];
  }

}
