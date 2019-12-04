// ANGULAR IMPORTS
import { BrowserModule } from '@angular/platform-browser/';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// FIREBASE IMPORTS
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// MATERIAL IMPORTS
import {
    MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule,
    MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatNativeDateModule
} from '@angular/material';


// BOOTSTRAP IMPORTS
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';


// SERVICES IMPORTS
import { IssueService } from './issue.service';
import { AuthService } from './auth/auth.service';


// PAGE COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './menu/menu_management/create/create.component';
import { EditComponent } from './menu/menu_management/edit/edit.component';
import { EditListComponent } from './menu/menu_management/edit/editList/editlist.component';
import { HomeComponent } from './home/home.component';
import { HomeCarouselComponent } from './home/home-carousel/home-carousel.component';
import { BreakfastService } from './services/breakfast.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocationsComponent } from './locations/locations.component';
import { AuthComponent } from './auth/auth.component';
import { SpinnerComponent } from 'src/assets/loading-spinner/spinner.component';
import { LoginComponent } from './auth/loginPage/login.component';
import { MenuSelectionComponent } from './menu/menu-selection/menu-selection.component';
import { HomeContentBoxComponent } from './home/home-content-box/home-content-box.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MenuComponent } from './menu/menu.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { HomeContentSlimComponent } from './home/home-content-box/home-content-slim/home-content-slim.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateorderComponent } from './shoppingcart/createorder/createorder.component';
import { ConstructionComponent } from './construction/construction.component';
import { SpacerComponent } from './spacer/spacer.component';
import { DeleteComponent } from './delete/delete.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'editlist', component: EditListComponent, canActivate: [AuthGuard] },
    { path: 'fullmenu', component: ListComponent }, //Deprecated
    { path: 'locations', component: LocationsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuSelectionComponent },
    { path: 'pagenotfound', component: PagenotfoundComponent },
    { path: 'localmenu/:menutype', component: MenuComponent }, //For MongoDB localhost
    { path: 'cart', component: ShoppingcartComponent },
    { path: "about", component: AboutusComponent },
    { path: "order", component: CreateorderComponent },
    { path: "menu/:menutype", component: ConstructionComponent },
    { path: "volume", component: DeleteComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        CreateComponent,
        EditComponent,
        EditListComponent,
        HomeComponent,
        HomeCarouselComponent,
        HeaderComponent,
        FooterComponent,
        LocationsComponent,
        AuthComponent,
        SpinnerComponent,
        LoginComponent,
        MenuSelectionComponent,
        HomeContentBoxComponent,
        PagenotfoundComponent,
        MenuComponent,
        ShoppingcartComponent,
        HomeContentSlimComponent,
        AboutusComponent,
        CreateorderComponent,
        ConstructionComponent,
        SpacerComponent,
        DeleteComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        MatToolbarModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        MatSnackBarModule,
        MatMenuModule,
        NgImageSliderModule,
        NgbModule,
        NgbCarouselModule,
        MatNativeDateModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule

    ],
    providers: [
        IssueService,
        BreakfastService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
