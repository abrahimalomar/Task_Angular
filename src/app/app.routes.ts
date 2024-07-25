import { Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { ListPreviewComponent } from './components/list-preview/list-preview.component';

export const routes: Routes =

  [

    { path: 'books', component: BooksComponent },
    { path: '', pathMatch: 'full', component: BooksComponent },
    { path: '**', component: BooksComponent, pathMatch: 'full' }
  ];
