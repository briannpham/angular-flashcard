import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { FlashCard } from 'src/app/models/flashcard';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
})
export class FlashcardsComponent implements OnInit {
  cards: FlashCard[] = [];

  constructor(private flashCardService: FlashcardsService) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  changeStatus(card: any) {
    console.log(card);
  }
  changeFavorite(id: any) {
    console.log(id);
  }
  changeDelete(id: any) {
    console.log(id);
  }

  saveCard(card: any) {
    console.log(card);
  }
  cancelCard() {
    console.log('cancel');
  }

  fetchCards() {
    this.flashCardService
      .getCards()
      .subscribe((result: FlashCard[]) => (this.cards = result));
  }

  createCard(card: FlashCard) {
    this.flashCardService
      .createCard(card)
      .subscribe((result) => this.fetchCards());
  }

  updateCard(card: FlashCard) {
    this.flashCardService
      .updateCard(card)
      .subscribe((result) => this.fetchCards());
  }

  deleteCard(cardId: any) {
    this.flashCardService
      .deleteCard(cardId)
      .subscribe((result) => this.fetchCards());
  }
}
