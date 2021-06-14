import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';

export interface ETable {
  date: string;
  randomNumber: number;
  expand: boolean;
}

const data: ETable[] = [];

@Component({
  selector: 'app-expandable-table',
  templateUrl: './expandable-table.component.html',
  styleUrls: ['./expandable-table.component.scss']
})
export class ExpandableTableComponent implements OnInit {

  EXPAND_INTERVAL = 10000 // 10s
  displayedColumns: string[] = ['click', 'date', 'randomNumber'];
  dataSource = data;
  sub: Subscription;

  @ViewChild(MatTable) table: MatTable<ETable[]>;

  constructor() { }

  ngOnInit(): void {
    const source = interval(this.EXPAND_INTERVAL);

    this.sub= source.subscribe(val => {
      this.dataSource.push({
        date: new Date().toISOString(), 
        randomNumber: this.generateRandomNumberDivisibleBy3(),
        expand: false
      });
      this.table.renderRows();
    });

  }

  generateRandomNumberDivisibleBy3() {
    const max = 1000;
    const divisible = 3;
    return (Math.floor(Math.random() * max) + divisible) * divisible;
  }

  expandData(element: ETable) {
    element.expand = true;
  }

  saveTable() {
    // TODO
  }

  clearTable() {
    this.dataSource = [];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
