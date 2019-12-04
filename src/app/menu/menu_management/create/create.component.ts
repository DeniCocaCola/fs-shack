import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../issue.service';
import { AuthService } from '../../../auth/auth.service';
import { MenuService } from '../../../services/menu.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['../menu_management.component.scss']
})
export class CreateComponent implements OnInit {
    isManager: boolean = false;
    createForm: FormGroup;
    currentDB = "Local";

    constructor(private issueService: IssueService, private menuService: MenuService, private router: Router, private fb: FormBuilder, private authService: AuthService, private http: HttpClient) {
        this.createForm = this.fb.group({
            item: ['', Validators.required],
            price: '',
            path: '',
            description: '',
            menu: ''
        });
    }

    ngOnInit() {
        if (this.authService.isManager == false) {
            console.log("Insufficient permissions. Redirecting...")
            this.router.navigate(['/pagenotfound']);
            this.isManager = false;
        } else if (this.authService.isManager == true) {
            this.isManager = true;
        }
    }

    addItemLocal(item, price, path, description, menu) {
        this.issueService.addIssue(item, price, path, description, menu).subscribe(() => {
            this.router.navigate(['/list']);
        });
    }

    addItemFirebase(item, price, path, description, menu) {
        this.menuService.addItemFirebase(item, price, path, description, menu).subscribe(() => {
            console.log('Attempting to add item');
            //this.snackBar.open("Item added", "Close", { duration: 2000});
        })
    }

    switchDatabase() {
        if (this.currentDB == "Local") {
            this.currentDB = "Firebase";
        }
        else if (this.currentDB == "Firebase") {
            this.currentDB = "Local";
        }
    }

}
