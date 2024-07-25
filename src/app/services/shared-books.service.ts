
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ibook } from '../models/Ibook';


@Injectable({
  providedIn: 'root'
})
export class SharedBooksService {
  private selectedBooksSubject = new BehaviorSubject<Ibook[]>([]);
  selectedBooks$ = this.selectedBooksSubject.asObservable();

  constructor() { }

  updateSelectedBooks(books: Ibook[]): void {
    this.selectedBooksSubject.next(books);
  }
}
