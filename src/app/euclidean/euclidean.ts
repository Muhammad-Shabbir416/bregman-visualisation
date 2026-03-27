import { Component, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as JXG from 'jsxgraph';
import { Bregman } from '../bregman/bregman';

// declare const JXG: any;

@Component({
  selector: 'app-euclidean',
  imports: [MatCardModule, Bregman],
  templateUrl: './euclidean.html',
  styleUrl: './euclidean.css',
})
export class EuclideanComponent {
    f = (x: number) => 0.5 * x * x;
    fPrime = (x: number) => x;
    id = 'euclidean'
}