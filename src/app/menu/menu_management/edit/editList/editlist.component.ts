import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Issue } from '../../../../issue.model';
import { IssueService } from '../../../../issue.service';
import { CompileMetadataResolver } from '@angular/compiler';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-editlist',
    templateUrl: './editlist.component.html',
    styleUrls: ['../../menu_management.component.scss']
})
export class EditListComponent implements OnInit {
    isManager: boolean = false;
    issues: Issue[];
    displayedColumns = ['item', 'description', 'price', 'path', 'actions']; // removed 'actions' and path
    sortedData: Issue[];

    constructor(private issueService: IssueService, private router: Router, private authService: AuthService) { }



    ngOnInit() {
        if(this.authService.isManager == false){
            console.log("Insufficient permissions. Redirecting...")
            this.router.navigate(['/pagenotfound']);
            this.isManager = false;
        } else if(this.authService.isManager == true){
            this.isManager = true;
            this.fetchIssues();
        }
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

    confirmation(id) {
        var confirmed = confirm("Delete this item?");
        if (confirmed == true) {
            this.deleteIssue(id);
        } else {
            console.log("Cancelled deletion.");
        }
    }

}