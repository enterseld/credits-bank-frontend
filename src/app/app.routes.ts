import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomePageComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';

export const routes: Routes = [{
    path: "",
    component: UserLayoutComponent,
    children: [
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: 'home', component: HomePageComponent},
        {path: 'profile', component: ProfileComponent},
        {path: 'credits', component: CreditsComponent},
        { path: 'auth', component: AuthPageComponent }
    ]   

}];
