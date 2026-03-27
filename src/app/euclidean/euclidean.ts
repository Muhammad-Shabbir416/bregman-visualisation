import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Bregman } from '../bregman/bregman';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-euclidean',
  imports: [MatCardModule, MatSlideToggleModule, Bregman, FormsModule],
  templateUrl: './euclidean.html',
  styleUrl: './euclidean.css',
})
export class EuclideanComponent {
  f = (x: number) => 0.5 * x * x;
  fPrime = (x: number) => x;
  id = 'euclidean'
  showTangent: boolean = false;
  showDivergence: boolean = true;
  showConvexity: boolean = false;
}