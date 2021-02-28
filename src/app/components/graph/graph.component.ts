import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {dia, shapes, ui} from '@clientio/rappid/index';
import {GraphService} from '../../services/graph.service';
import {ChartService} from '../../services/chart.service';
import {DialogChartComponent} from '../dialog-chart/dialog-chart.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;
  private scroller: ui.PaperScroller;

  constructor(
    private graphService: GraphService,
    private chartService: ChartService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.graphInit();
  }

  ngAfterViewInit(): void {
    const { scroller, paper, canvas } = this;
    canvas.nativeElement.appendChild(this.scroller.el);
    scroller.center();
    paper.unfreeze();
  }

  graphInit(): void {
    const graph = this.graph = new dia.Graph({}, { cellNamespace: shapes });

    const paper = this.paper = new dia.Paper({
      model: graph,
      background: {
        color: 'transparent',
      },
      frozen: true,
      async: true,
      cellViewNamespace: shapes
    });

    const scroller = this.scroller = new ui.PaperScroller({
      paper,
      autoResizePaper: true,
      cursor: 'grab'
    });

    scroller.render();

    const rectangles = [];

    this.graphService.getGraph().forEach(item => {
      const rect = new shapes.standard.Rectangle({
        position: {
          x: item.position.x,
          y: item.position.y
        },
        size: {
          width: 150,
          height: 70
        },
        attrs: {
          body: {
            fill: '#0090ff',
            rx: 20,
            ry: 20,
            strokeWidth: 0
          },
          label: {
            text: item.text,
            fill: '#FFFFFF',
            fontSize: 16,
            fontVariant: 'small-caps'
          }
        }
      });

      this.graph.addCell(rect);

      rectangles.push(rect);
    });

    rectangles.forEach((item, index) => {
      const link = new shapes.standard.Link();

      if (index !== rectangles.length - 1) {
        link.source(item);
        link.target(rectangles[index + 1]);
      }

      link.addTo(this.graph);
    });

    paper.on('element:pointerclick', (elementView) => {
      this.openDialogChart(elementView.id);
    });
  }

  openDialogChart(objectID: string): void {
    const seriesChart = this.chartService.getChartByObjectID(objectID).series;

    if (seriesChart.length) {
      this.dialog.open(DialogChartComponent, {
        minWidth: '300px',
        width: '1000px',
        data: {
          seriesChart
        }
      });
    } else {
      this.openSnackBar('У данного объекта нет данных.');
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Закрыть', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
