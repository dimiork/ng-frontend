import { Component, OnInit } from '@angular/core';

import { StatisticsService, NotificationService } from '../../services/';
import { StatisticProduct, StatisticOrder } from '../../models/';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {

  statisticsOfProducts: StatisticProduct[];
  statisticsOfOrders: StatisticOrder[];

  view: number[] = [700, 400];

  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabelProducts: string = 'Products';
  showYAxisLabel: boolean = true;
  yAxisLabelProducts: string = 'Count';

  xAxisLabelOrders: string = 'Date';
  yAxisLabelOrders: string = 'Count';

  colorScheme: object = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private statisticsService: StatisticsService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.statisticsService.getStatisticsOfProducts()
      .subscribe( (data: any) => {
        this.statisticsOfProducts = data;
      });
    this.statisticsService.getStatisticsOfOrders()
      .subscribe( (data: any) => {
        this.statisticsOfOrders = data;
      });
  }

  onSelect(event: { [ key: string ]: number }): void {
    const msg: string = `${ event['name'] || 'It' } is ${ event['value'] }`;
    this.notify.show(msg);
  }

}
