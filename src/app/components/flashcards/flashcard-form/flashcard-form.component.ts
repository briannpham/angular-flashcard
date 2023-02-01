import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-flashcard-form',
  templateUrl: './flashcard-form.component.html',
  styleUrls: ['./flashcard-form.component.scss'],
})
export class FlashcardFormComponent {
  flashcardForm = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.save.emit(this.flashcardForm.value);
  }
}
