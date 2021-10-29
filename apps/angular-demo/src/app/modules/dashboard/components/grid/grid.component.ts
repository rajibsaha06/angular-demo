import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Students } from '../../models/dashboard.interface';

@Component({
  selector: 'demo-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() data: Students[] = [];
  @Input() loader: boolean = false;
  rows = 6;
  rowsPerPageOptions = [6, 12, 24, 48];
  @ViewChild('studentTable') studentTable: Table | undefined;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Table Filter
   * @param $event
   * @returns void
   */
  applyFilterGlobal($event: any): void {
    this.studentTable.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }
}
