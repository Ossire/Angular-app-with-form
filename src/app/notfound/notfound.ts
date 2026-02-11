import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-notfound',
  imports: [RouterLink],
  templateUrl: './notfound.html',
  styleUrl: './notfound.css',
})
export class Notfound {
  constructor(private route: Router) {}
}
