import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as JXG from 'jsxgraph';

@Component({
  selector: 'app-bregman',
  imports: [FormsModule],
  templateUrl: './bregman.html',
  styleUrl: './bregman.css',
})
export class Bregman implements AfterViewInit, OnChanges {
  @Input() f: (x: number) => number = x => 0.5 * x * x;
  @Input() fPrime: (x: number) => number = x => x;
  @Input() id: string = 'jxgbox';
  @Input() showTangent: boolean = true;
  @Input() showDivergence: boolean = true;
  @Input() showConvexity: boolean = false;

  tangent!: JXG.Line;
  divergence!: JXG.Line;
  convexity!: JXG.Line;

  ngAfterViewInit(): void {
    const board = JXG.JSXGraph.initBoard(this.id, {
      boundingbox: [-5, 5, 5, -1],
      axis: true
    });

    const curve = board.create('functiongraph', [this.f]);

    const p = board.create('glider', [0, this.f(0), curve], { name: 'P', size: 4 });
    const q = board.create('glider', [1, this.f(1), curve], { name: 'Q', size: 4 });

    const tangentY = () => this.f(q.X()) + this.fPrime(q.X()) * (p.X() - q.X());
    const projectionCoords = () => [p.X(), tangentY()];
    const tangentProjection = board.create('point', [projectionCoords], { name: "", face: '[]', size: 2 });

    this.tangent = board.create('line', [q, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'blue', strokeOpacity: this.showTangent ? 0.8 : 0, dash: 2 });
    this.divergence = board.create('line', [p, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'red', strokeOpacity: this.showDivergence ? 0.8 : 0, dash: 2 });
    this.convexity = board.create('line', [q, p], { straightFirst: false, straightLast: false, strokeColor: 'green', strokeOpacity: this.showConvexity ? 0.8 : 0, dash: 2 });

  }

  ngOnChanges(changes: SimpleChanges): void {
    const tangentChange = changes['showTangent'];
    const divergenceChange = changes['showDivergence'];
    const convexityChange = changes['showConvexity'];
    if ((tangentChange && !tangentChange.isFirstChange()) ||
      (divergenceChange && !divergenceChange.isFirstChange()) ||
      (convexityChange && !convexityChange.isFirstChange())) {
      this.updateVisibility();
    }
  }

  updateVisibility() {
    if (this.tangent) {
      this.animateLine(this.tangent, this.showTangent);
    }
    if (this.divergence) {
      this.animateLine(this.divergence, this.showDivergence);
    }
    if (this.convexity) {
      this.animateLine(this.convexity, this.showConvexity);
    }
  }

  animateLine(line: JXG.Line, show: boolean) {
    const targetOpacity = show ? 0.8 : 0;
    const step = 0.05 * (show ? 1 : -1);
    let currentOpacity = parseFloat(line.getAttribute('strokeOpacity') || '0');

    const interval = setInterval(() => {
      currentOpacity += step;
      if ((show && currentOpacity >= targetOpacity) || (!show && currentOpacity <= targetOpacity)) {
        currentOpacity = targetOpacity;
        clearInterval(interval);
      }
      line.setAttribute({ strokeOpacity: currentOpacity });
    }, 25);
  }


}
