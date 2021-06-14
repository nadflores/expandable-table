import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpandableTableComponent } from './expandable-table.component';
import { RouterModule } from "@angular/router";

import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    ExpandableTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: "",
        component: ExpandableTableComponent
      }
    ]),
  ]
})
export class ExpandableTableModule { }
