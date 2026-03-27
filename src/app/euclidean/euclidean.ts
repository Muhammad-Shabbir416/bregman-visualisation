import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Bregman } from '../bregman/bregman';
import { FormsModule } from '@angular/forms';
import katex from 'katex';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  showTangent: boolean = true;
  showDivergence: boolean = true;
  showConvexity: boolean = false;
  showReverse: boolean = false;
  reverseLatex!: SafeHtml;
  functionLatex!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    const raw = katex.renderToString('D_f(Q,P)', { throwOnError: false });
    this.reverseLatex = this.sanitizer.bypassSecurityTrustHtml(raw);
    const functionRaw = katex.renderToString('f(x) = \\frac{1}{2} x^2', { throwOnError: false });
    this.functionLatex = this.sanitizer.bypassSecurityTrustHtml(functionRaw);
  }
}