
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ibook } from '../../models/Ibook';

@Component({
  selector: 'app-book-card',
  standalone: true,
    imports: [],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book!: Ibook;
  @Input() viewMode: boolean = false;
  @Input() showDeleteButton: boolean = false;
  @Output() onDelete = new EventEmitter<string>();

  deleteBook(): void {
    if (this.book.key) {
      this.onDelete.emit(this.book.key);
    }
  }
}
