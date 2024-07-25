
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from '../../services/books.service';

import { FormsModule } from '@angular/forms';
import { SharedBooksService } from '../../services/shared-books.service';
import { CommonModule } from '@angular/common';
import { ListPreviewComponent } from "../list-preview/list-preview.component";
import { SelectedBooksComponent } from "../selected-books/selected-books.component";

import { BookCardComponent } from "../../Shared/book-card/book-card.component";
import { Ibook } from '../../models/Ibook';
import { IResponse } from '../../models/IResponse';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule, ListPreviewComponent, SelectedBooksComponent, BookCardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedBooks: Ibook[] = [];
  currentBook!: Ibook;
  books: Ibook[] = [];
  searchTerm: string = '';
  filteredBooks: Ibook[] = [];

  currentPage: number = 1;
  pageSize: number = 12;
  isLoading: boolean = false;
  hasMore: boolean = true;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private booksService: BooksService,
    private sharedBooksService: SharedBooksService
  ) {


  }
  ngAfterViewInit(): void {
    const container = this.scrollContainer?.nativeElement;
    if (container) {
      container.addEventListener('scroll', this.onScroll.bind(this));
    } else {
      console.error('scrollContainer is not defined');
    }
  }


  ngOnInit(): void {

    this.getAllBooks();

  }

  getAllBooks(): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    this.booksService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (response: IResponse<Ibook[]>) => {
        this.books = response.docs;
        this.filteredBooks = response.docs;

        this.hasMore = response.docs.length === this.pageSize;
        this.currentPage++;
        this.isLoading = false;

      },
      error: (error) => {
        console.log('Error:', error);
        this.isLoading = false;
      }
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  setBook(book: Ibook) {
    if (!this.selectedBooks.includes(book)) {
      this.selectedBooks.push(book);
      this.sharedBooksService.updateSelectedBooks(this.selectedBooks);
    }
    this.currentBook = book;

  }

  @HostListener('scroll')
  onScroll(): void {
    const container = this.scrollContainer.nativeElement;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const scrollHeight = container.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5) { // -5 for margin of error

      if (!this.isLoading && this.hasMore) {
        this.getAllBooks();
      }
    }
  }


  ngOnDestroy(): void {
    const container = this.scrollContainer?.nativeElement;
    if (container) {
      container.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

}
