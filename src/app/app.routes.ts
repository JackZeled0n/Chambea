import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/posts/posts.module').then(m => m.PostsModule) },
];
