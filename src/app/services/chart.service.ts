import { Injectable } from '@angular/core';

interface SeriesChart {
  name: string;
  data: number[];
}

interface Chart {
  id: number;
  objectID: string;
  series: SeriesChart[];
}

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  charts: Chart[] = [
    {
      id: 1,
      objectID: 'j_1',
      series: [
        {
          name: '2019',
          data: [820, 932, 901, 800, 934, 1290, 1330, 1320, 1000, 1050, 930, 1256]
        },
        {
          name: '2020',
          data: [456, 564, 647, 856, 1156, 1500, 1335, 754, 604, 850, 950, 1463]
        }
      ]
    },
    {
      id: 2,
      objectID: 'j_2',
      series: [
        {
          name: '2019',
          data: [350, 370, 456, 226, 567, 650, 704, 844, 1050, 1256, 956, 1356]
        },
        {
          name: '2020',
          data: [656, 564, 647, 863, 1156, 160, 135, 754, 604, 560, 870, 456]
        }
      ]
    },
    {
      id: 3,
      objectID: 'j_3',
      series: [
        {
          name: '2019',
          data: [467, 647, 1005, 1256, 1567, 1735, 1456, 1124, 643, 1274, 956, 1124]
        },
        {
          name: '2020',
          data: [144, 245, 125, 164, 245, 267, 300, 257, 100, 560, 850, 956]
        }
      ]
    },
    {
      id: 4,
      objectID: 'j_4',
      series: [
        {
          name: '2019',
          data: [667, 647, 636, 753, 756, 642, 630, 714, 763, 610, 724, 742]
        },
        {
          name: '2020',
          data: [94, 145, 125, 164, 245, 267, 300, 257, 120, 140, 256, 112]
        }
      ]
    },
    {
      id: 5,
      objectID: 'j_5',
      series: [
        {
          name: '2019',
          data: [215, 220, 225, 256, 266, 252, 235, 221, 260, 256, 500, 644]
        },
        {
          name: '2020',
          data: [94, 96, 100, 112, 125, 110, 100, 110, 95, 96, 99, 91]
        }
      ]
    },
    {
      id: 6,
      objectID: 'j_6',
      series: []
    }
  ];

  constructor() { }

  getChartByObjectID(objectID: string): Chart {
    return this.charts.find(chart => chart.objectID === objectID);
  }
}
