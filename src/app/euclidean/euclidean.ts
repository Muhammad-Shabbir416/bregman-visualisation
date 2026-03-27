import { Component, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as JXG from 'jsxgraph';

// declare const JXG: any;

@Component({
  selector: 'app-euclidean',
  imports: [MatCardModule],
  templateUrl: './euclidean.html',
  styleUrl: './euclidean.css',
})
export class EuclideanComponent implements AfterViewInit {

  ngAfterViewInit() {
    const board = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -1],
      axis: true
    });

    const f = (x: number) => 0.5 * x * x;

    const curve = board.create('functiongraph', [f]);

    const x = board.create('glider', [0, 0, curve], { name: 'x', size: 4 });
    const x0 = board.create('glider', [1, 0.5, curve], { name: 'x₀', size: 4 });

    const tangentY = () => x0.Y() - (x0.X()) * (x0.X() - x.X());
    const projectionCoords = () => [x.X(), tangentY()];
    const tangentProjection = board.create('point', [projectionCoords], { name: "", face: '[]', size: 2 });

    const tangent = board.create('line', [x0, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'blue', strokeOpacity: 0.4, dash: 2 });
    const divergence = board.create('line', [x, tangentProjection], { straightFirst: false, straightLast: false, strokeColor: 'red', strokeOpacity: 0.8, dash: 2 });
  }
}