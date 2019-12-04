import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class IssueService {

    uri = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getIssues() {
        return this.http.get(`${this.uri}/issues`);
    }

    getIssueById(id) {
        return this.http.get(`${this.uri}/issues/${id}`);
    }

    addIssue(item, price, path, description, menu) {
        const issue = {
            item: item,
            description: description,
            price: price,
            menu: menu,
            path: path
        };
        return this.http.post(`${this.uri}/issues/add`, issue);
    }

    updateIssue(id, item, price, path, description, menu) {
        const issue = {
            id: id,
            item: item,
            description: description,
            price: price,
            menu: menu,
            path: path
        };
        return this.http.post(`${this.uri}/issues/update/${id}`, issue);
    }

    deleteIssue(id) {
        return this.http.get(`${this.uri}/issues/delete/${id}`);
    }
}


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


// @Injectable({
//     providedIn: 'root'
// })
// export class IssueService {

//     uri = 'http://localhost:4000';

//     constructor(private http: HttpClient) { }

//     getIssues() {
//         return this.http.get(`${this.uri}/issues`);
//     }

//     getIssueById(id) {
//         return this.http.get(`${this.uri}/issues/${id}`);
//     }

//     addIssue(title, responsible, description, severity) {
//         const issue = {
//             title: title,
//             responsible: responsible,
//             description: description,
//             severity: severity
//         };
//         return this.http.post(`${this.uri}/issues/add`, issue);
//     }

//     updateIssue(id, title, responsible, description, severity) {
//         const issue = {
//             id: id,
//             title: title,
//             responsible: responsible,
//             description: description,
//             severity: severity,
//             status: status
//         };
//         return this.http.post(`${this.uri}/issues/update/${id}`, issue);
//     }

//     deleteIssue(id) {
//         return this.http.get(`${this.uri}/issues/delete/${id}`);
//     }
// }
