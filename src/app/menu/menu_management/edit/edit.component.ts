import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../../issue.service';
import { AuthService } from '../../../auth/auth.service';
import { Issue } from '../../../issue.model';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['../menu_management.component.scss']
})
export class EditComponent implements OnInit {
    isManager: boolean = false;
    id: String;
    issue: any = {};
    updateForm: FormGroup;

    // tslint:disable-next-line:max-line-length
    constructor(
        private authService: AuthService,
        private issueService: IssueService, 
        private router: Router, 
        private route: ActivatedRoute, 
        private snackBar: MatSnackBar, 
        private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.updateForm = this.fb.group({
            id: this.issueService.getIssueById(this.id),
            item: '',
            price: '',
            path: '',
            description: '',
            menu: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params.id;
            this.issueService.getIssueById(this.id).subscribe(res => {
                this.issue = res;
                this.updateForm.get('id').setValue(this.issue.id);
                this.updateForm.get('item').setValue(this.issue.item);
                this.updateForm.get('price').setValue(this.issue.price);
                this.updateForm.get('path').setValue(this.issue.path);
                this.updateForm.get('description').setValue(this.issue.description);
                this.updateForm.get('menu').setValue(this.issue.menu);
            });
        });
        if(this.authService.isManager == false){
            console.log("Insufficient permissions. Redirecting...")
            this.router.navigate(['/pagenotfound']);
            this.isManager = false;
        } else if(this.authService.isManager == true){
            this.isManager = true;
        }
    }

    updateIssue(item, price, path, description, menu) {
        // tslint:disable-next-line: max-line-length
        this.issueService.updateIssue(
            this.id, 
            item, 
            price, 
            path, 
            description, 
            menu
            ).subscribe(() => {
            this.snackBar.open('Menu Item updated successfully', 'OK', {
                duration: 3000
            });
        });
    }

}