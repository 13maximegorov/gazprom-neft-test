import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import {ChartService} from '../../services/chart.service';

@Component({
  selector: 'app-dialog-chart',
  templateUrl: './dialog-chart.component.html',
  styles: [
  ]
})
export class DialogChartComponent implements OnInit {
  chartOption = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.chartInit(this.data.objectID);
  }

  chartInit(objectID: string): void {
    const legendData = [];
    const series = [];

    this.chartService.getChartByObjectID(objectID).series.forEach(item => {
      legendData.push(item.name);
      series.push({
        name: item.name,
        data: item.data,
        type: 'line'
      });
    });

    const chartOption = {
      title: {
        text: 'Добыча нефти'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: legendData
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь'
        ],
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value',
      },
      series
    };

    this.chartOption = chartOption;
  }
}
