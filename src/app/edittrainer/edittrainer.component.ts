import { Component } from '@angular/core';

@Component({
  selector: 'app-edittrainer',
  templateUrl: './edittrainer.component.html',
  styleUrls: ['./edittrainer.component.css']
})
export class EdittrainerComponent {

  currentRow = 0;

  nextRow() {
    if (this.currentRow < 2) {
      this.currentRow++;
    }
  }

  previousRow() {
    if (this.currentRow > 0) {
      this.currentRow--;
    }
  }

}
