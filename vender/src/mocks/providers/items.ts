import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "picture": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };

  constructor(public http: HttpClient) {
    this.http.get('assets/i18n/items.json').subscribe(data => {
      let mydata = JSON.parse(JSON.stringify(data));
      for (var i = 0; i < Object.keys(mydata['data']).length; i++){
        this.items.push(new Item(mydata['data'][i]));
      }      
    });
    /*
    for (let item of items) {
      this.items.push(new Item(item));
    }*/
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
