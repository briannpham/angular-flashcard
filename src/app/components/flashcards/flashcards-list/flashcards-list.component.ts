import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlashCard } from 'src/app/models/flashcard';

@Component({
  selector: 'app-flashcards-list',
  templateUrl: './flashcards-list.component.html',
  styleUrls: ['./flashcards-list.component.scss'],
})
export class FlashcardsListComponent {
  @Input() flashcards: FlashCard[] | null = [];
  @Output() like = new EventEmitter();
  @Output() check = new EventEmitter();
  @Output() delete = new EventEmitter();
}
