import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './expandable-table.component';
import { RouterModule } from "@angular/router";

import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";



@NgModule({
  declarations: [
    ExpandableTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forChild([
      {
        path: "",
        component: ExpandableTableComponent
      }
    ]),
  ]
})
export class ExpandableTableModule { }
