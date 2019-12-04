import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-menu-selection',
  templateUrl: './menu-selection.component.html',
  styleUrls: ['./menu-selection.component.scss']
})
export class MenuSelectionComponent implements OnInit {
  isManager: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isManager == false) {
      this.isManager = false;
    } else if (this.authService.isManager == true) {
      this.isManager = true;
    }
  }
}
