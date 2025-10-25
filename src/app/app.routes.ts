import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Users } from './users/users';
import { Posts } from './posts/posts';
import { Todolist } from './todolist/todolist';
import { Actions } from './actions/actions';

export const routes: Routes = [
    {path: '', component: Main},
    {path: 'users', component:Users},
    {path: 'posts', component:Posts},
    {path: 'todolist', component: Todolist},
    {path: 'actions', component:Actions}
];
