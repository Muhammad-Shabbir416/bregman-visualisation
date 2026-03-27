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
  @Input() showTangent: boolean = false;
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

    const x = board.create('glider', [0, this.f(0), curve], { name: 'x', size: 4 });
    const x0 = board.create('glider', [1, this.f(1), curve], { name: 'x₀', size: 4 });

    const tangentY = () => this.f(x0.X()) + this.fPrime(x0.X()) * (x.X() - x0.X());
    const projectionCoords = () => [x.X(), tangentY()];
    const tangentProjection = board.create('point', [projectionCoords], { name: "", face: '[]', size: 2 });

    this.tangent = board.create('line', [x0, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'blue', strokeOpacity: 0.4, dash: 2 });
    this.divergence = board.create('line', [x, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'red', strokeOpacity: 0.8, dash: 2 });
    this.convexity = board.create('line', [x0, x], { straightFirst: false, straightLast: false, strokeColor: 'green', strokeOpacity: 0.8, dash: 2 });

    this.updateVisibility();
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
    this.tangent.setAttribute({ visible: this.showTangent });
    this.divergence.setAttribute({ visible: this.showDivergence });
    this.convexity.setAttribute({ visible: this.showConvexity });
  }


}
