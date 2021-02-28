import { Injectable } from '@angular/core';

interface Graph {
  id: string;
  position: {
    x: number,
    y: number
  };
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  graph: Graph[] = [
    {
      id: 'j_1',
      position: {
        x: 0,
        y: 0
      },
      text: 'Объект 1'
    },
    {
      id: 'j_2',
      position: {
        x: 300,
        y: -50
      },
      text: 'Объект 2'
    },
    {
      id: 'j_3',
      position: {
        x: 100,
        y: 300
      },
      text: 'Объект 3'
    },
    {
      id: 'j_4',
      position: {
        x: 600,
        y: 50
      },
      text: 'Объект 4'
    },
    {
      id: 'j_5',
      position: {
        x: 600,
        y: 300
      },
      text: 'Объект 5'
    },
    {
      id: 'j_6',
      position: {
        x: 300,
        y: 500
      },
      text: 'Объект 6'
    },
  ];

  constructor() { }

  getGraph(): Graph[] {
    return this.graph;
  }
}
