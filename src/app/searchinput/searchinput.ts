import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StateService } from '../services/state-service';

@Component({
  selector: 'app-searchinput',
  imports: [FormsModule],
  templateUrl: './searchinput.html',
  styleUrl: './searchinput.css',
})
export class Searchinput {
  text = '';

  constructor(private stateService: StateService) {}

  onSearchBegins(value: string) {
    this.stateService.setSearchedText(value);
  }
}
