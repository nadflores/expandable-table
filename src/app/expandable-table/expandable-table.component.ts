import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

export interface ETable {
  id?: string;
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

  constructor( private firestore: AngularFirestore ) {}

  ngOnInit(): void {
    this.firestore.collection("table")
      .valueChanges({idField: "id"})
      .subscribe(data => {
        this.dataSource = data as ETable[];
      })

    const source = interval(this.EXPAND_INTERVAL);

    this.sub= source.subscribe(val => {
      const row = {
        date: new Date().toISOString(), 
        randomNumber: this.generateRandomNumberDivisibleBy3(),
        expand: false
      }

      this.saveRow(row);
    });

  }

  generateRandomNumberDivisibleBy3() {
    const max = 1000;
    const divisible = 3;
    return (Math.floor(Math.random() * max) + divisible) * divisible;
  }

  expandData(element: ETable) {
    this.firestore.collection("table").doc(element.id).update({expand: true});
  }

  saveRow(data: ETable) {
    this.firestore
      .collection("table")
      .add(data)
  }

  clearTable() {
    this.dataSource.forEach(val => {
      this.firestore.collection("table").doc(val.id).delete();
    })
  }

  deleteRow(id: string) {
    this.firestore.collection("table").doc(id).delete();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
