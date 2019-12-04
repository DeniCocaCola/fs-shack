import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class BreakfastService {

    uri = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getBreakfast() {
        return this.http.get(`${this.uri}/breakfastmenu`);
    }

    getBreakfastById(id) {
        return this.http.get(`${this.uri}/breakfastmenu/${id}`);
    }

    addBreakfast(item, description, price) {
        const breakfast = {
            item: item,
            description: description,
            price: price
        };
        return this.http.post(`${this.uri}/breakfastmenu/add`, breakfast);
    }

    updateIssue(id, item, description, price) {
        const breakfast = {
            id: id,
            item: item,
            description: description,
            price: price
        };
        return this.http.post(`${this.uri}/breakfastmenu/update/${id}`, breakfast);
    }

    deleteIssue(id) {
        return this.http.get(`${this.uri}/breakfastmenu/delete/${id}`);
    }
}