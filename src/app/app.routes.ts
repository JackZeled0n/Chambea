import { Routes } from '@angular/router';
import { PostDetailsComponent } from './features/post-details/components/post-details.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
    { path: 'post-details/:id', component: PostDetailsComponent }
];
