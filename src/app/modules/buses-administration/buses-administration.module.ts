import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusesAdministrationRoutingModule } from './buses-administration-routing.module';
import {BusesListComponent} from "./buses-list/buses-list.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { BusDetailComponent } from './bus-detail/bus-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [BusesListComponent, BusDetailComponent],
  imports: [
    CommonModule,
    BusesAdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class BusesAdministrationModule { }
