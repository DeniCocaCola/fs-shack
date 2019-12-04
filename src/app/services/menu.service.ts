import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements OnInit {
  constructor(private http: HttpClient) { }
  lunchArray = [];
  ngOnInit() {
    this.fetchLunch();
    console.log(this.lunchArray.length);
  }

  sendPostRequest(postData: { title: string; content: string }) {
    console.log(postData);
    this.http.post('https://fullstack-shack.firebaseio.com/menu.json', postData)
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  private fetchMenu() {
    this.http.get('https://fullstack-shack.firebaseio.com/menu.json')
      .pipe(map(responseData => {
        const menuArrayRes = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            menuArrayRes.push({ ...responseData[key], id: key })
          }
        }
        return menuArrayRes;
      }))
      .subscribe(posts => {

        console.log(posts);
      });
  }

  fetchLunch() {
    this.http.get('https://fullstack-shack.firebaseio.com/menu/Lunch.json')
      .pipe(map(responseData => {

        const menuArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            menuArray.push({ ...responseData[key], id: key })
          }
        }
        return menuArray;
      })).subscribe(lunchItems => {
        this.lunchArray = lunchItems;
        //this.createLunchMenu(lunchItems);
      });
  }

  createLunchMenu(lunchItems) {
    console.log(lunchItems.length);
    for (let i = 0; i < lunchItems.length; i++) {
      this.lunchArray[i].push(lunchItems[i]);
      console.log(this.lunchArray[i]);
    }
  }

  getEntireMenu() {
    this.fetchMenu();
  }

  addItemFirebase(item: string, price: number, path: string, description: string, menu: string) {
    console.log(
      "Item: " + item + " Price: " + price + " Description: " + description + " Menu: " + menu
    );
    const newItem = {
      Description: description,
      Path: path,
      Price: price
    };
    return this.http.put(`https://fullstack-shack.firebaseio.com/menu/` + menu + `/` + item + `.json`, newItem);
  }
}
