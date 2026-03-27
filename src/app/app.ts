import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { EuclideanComponent } from './euclidean/euclidean';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatCardModule, EuclideanComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bregman-website');
}
