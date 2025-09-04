import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreditsComponent } from './pages/credits/credits.component';

export const routes: Routes = [{
    path: "",
    component: UserLayoutComponent,
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'credits', component: CreditsComponent},
    ]   

}];
