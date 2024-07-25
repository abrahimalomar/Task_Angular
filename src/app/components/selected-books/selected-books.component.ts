import { Component, Input } from '@angular/core';

import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SharedBooksService } from '../../services/shared-books.service';
import { BookCardComponent } from '../../Shared/book-card/book-card.component';
import { CommonModule } from '@angular/common';
import { Ibook } from '../../models/Ibook';

@Component({
  selector: 'app-selected-books',
  standalone: true,
  imports: [CdkDropList, CdkDrag, BookCardComponent, CommonModule],
  templateUrl: './selected-books.component.html',
  styleUrls: ['./selected-books.component.css']
})
export class SelectedBooksComponent {
  @Input() viewMode = false;
  @Input() selectedBooks: Ibook[] = [];

  constructor(private sharedBooksService: SharedBooksService) {
    this.sharedBooksService.selectedBooks$.subscribe(books => {
      this.selectedBooks = books;
    });
  }

  remove(bookKey: string): void {
    const index = this.selectedBooks.findIndex(book => book.key === bookKey);

    if (index !== -1) {

      this.selectedBooks.splice(index, 1);
    }
    this.sharedBooksService.updateSelectedBooks(this.selectedBooks);


  }

  drop(event: CdkDragDrop<Ibook[]>): void {
    moveItemInArray(this.selectedBooks, event.previousIndex, event.currentIndex);
    this.sharedBooksService.updateSelectedBooks(this.selectedBooks);
  }
}
