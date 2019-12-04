import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../issue.model';
import { IssueService } from '../issue.service';
import { CompileMetadataResolver } from '@angular/compiler';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    issues: Issue[];
    displayedColumns = ['item', 'description', 'price', 'menu', 'path']; // removed 'actions' and path
    sortedData: Issue[];

    constructor(private issueService: IssueService, private router: Router) { }



    ngOnInit() {
        this.fetchIssues();
    }

    fetchIssues() {
        this.issueService.getIssues().subscribe((data: Issue[]) => {
            this.issues = data;
            console.log('Data requested ...');
            console.log(this.issues);
        });
    }

    editIssue(id) {
        this.router.navigate([`/edit/${id}`]);
    }

    deleteIssue(id) {
        this.issueService.deleteIssue(id).subscribe(() => {
            this.fetchIssues();
        });
    }

}



// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatTableDataSource } from '@angular/material';
// import { Issue } from '../issue.model';
// import { IssueService } from '../issue.service';

// import { MatSort } from '@angular/material/sort';

// @Component({
//     selector: 'app-list',
//     templateUrl: './list.component.html',
//     styleUrls: ['./list.component.scss']
// })
// export class ListComponent implements OnInit {

//     issues: Issue[];
//     displayedColumns = ['title', 'responsible', 'severity', 'status']; // removed 'actions'
//     dataSource = new MatTableDataSource(this.issues);//


//     constructor(private issueService: IssueService, private router: Router) { }

//     @ViewChild(MatSort, {static: true}) sort: MatSort;//

//     ngOnInit() {
//         this.fetchIssues();
//         this.dataSource.sort = this.sort//
//     }

//     fetchIssues() {
//         this.issueService.getIssues().subscribe((data: Issue[]) => {
//             this.issues = data;
//             console.log('Data requested ...');
//             console.log(this.issues);
//         });
//     }

//     editIssue(id) {
//         this.router.navigate([`/edit/${id}`]);
//     }

//     deleteIssue(id) {
//         this.issueService.deleteIssue(id).subscribe(() => {
//             this.fetchIssues();
//         });
//     }

// }