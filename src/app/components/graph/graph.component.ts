import {Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {dia, shapes, ui} from '@clientio/rappid/index';
import {GraphService} from '../../services/graph.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogChartComponent} from '../dialog-chart/dialog-chart.component';

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
    public dialog: MatDialog
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
        color: '#F8F9FA',
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
          width: 100,
          height: 50
        },
        attrs: {
          label: {
            text: item.text
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
      } else {
        link.source(rectangles[rectangles.length - 1]);
        link.target(rectangles[0]);
      }

      link.addTo(this.graph);
    });

    paper.on('element:pointerclick', (elementView) => {
      this.openDialogChart(elementView.id);
    });
  }

  openDialogChart(objectID: string): void {
    this.dialog.open(DialogChartComponent, {
      minWidth: '300px',
      width: '1000px',
      data: {
        objectID
      }
    });
  }
}
