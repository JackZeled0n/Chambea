import { Routes } from '@angular/router';
import { PostDetailsComponent } from './features/post-details/components/post-details.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/posts/posts.module').then(m => m.PostsModule) },
    { path: 'post-details/:id', component: PostDetailsComponent }
];
