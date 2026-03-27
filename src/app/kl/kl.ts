import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Bregman } from '../bregman/bregman';
import { FormsModule } from '@angular/forms';
import katex from 'katex';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Binary target label
@Component({
  selector: 'app-kl',
  imports: [MatCardModule, MatSlideToggleModule, Bregman, FormsModule],
  templateUrl: './kl.html',
  styleUrl: './kl.css',
})
export class KlComponent {
  f = (x: number) => x*Math.log(x) + (1-x)*Math.log(1-x);
  fPrime = (x: number) => Math.log(x/(1-x));
  id = 'kl'
  showTangent: boolean = true;
  showDivergence: boolean = true;
  showConvexity: boolean = false;
  showReverse: boolean = false;
  reverseLatex!: SafeHtml;
  functionLatex!: SafeHtml;
  boundingBox: [number, number, number, number] = [-2, 3, 3, -8];

  constructor(private sanitizer: DomSanitizer) {
    const raw = katex.renderToString('D_f(Q,P)', { throwOnError: false });
    this.reverseLatex = this.sanitizer.bypassSecurityTrustHtml(raw);
    const functionRaw = katex.renderToString('f(x) = \\mathbb{E}[logp(x)] = xlog(x) + (1-x)log(1-x)', { throwOnError: false });
    this.functionLatex = this.sanitizer.bypassSecurityTrustHtml(functionRaw);
  }
}
