import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { FlashCard } from 'src/app/models/flashcard';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
})
export class FlashcardsComponent implements OnInit {
  cards: FlashCard[] = [];
  cards$: any;
  user = this.userService.user;

  constructor(
    private flashCardService: FlashcardsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.fetchCards(this.userService.user.token);
    }
  }

  changeStatus(card: any) {
    const updatedCard = {
      ...card,
      status: card.status === 'not reviewed' ? 'reviewed' : 'not reviewed',
    };
    this.updateCard(updatedCard);
  }

  changeFavorite(card: any) {
    const updatedCard = {
      ...card,
      favorite: !card.favorite,
    };
    this.updateCard(updatedCard);
  }

  saveCard(card: any) {
    console.log(card);
  }
  cancelCard() {
    console.log('cancel');
  }

  fetchCards(userToken: string) {
    this.flashCardService
      .getCards(userToken)
      .subscribe((result: FlashCard[]) => (this.cards = result));
    // this.cards$ = this.flashCardService.getCards();  // see some flickering when doing observable stream
  }

  createCard(card: FlashCard) {
    this.flashCardService
      .createCard(card)
      .subscribe((result) => this.fetchCards(this.userService.user.token));
  }

  updateCard(card: FlashCard) {
    this.flashCardService
      .updateCard(card)
      .subscribe((result) => this.fetchCards(this.userService.user.token));
  }

  deleteCard(cardId: any) {
    this.flashCardService
      .deleteCard(cardId)
      .subscribe((result) => this.fetchCards(this.userService.user.token));
  }
}
