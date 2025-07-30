import { Component, input, output, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CamelToTitlePipe } from '../../pipes/camel-to-title-pipe';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule, CamelToTitlePipe, MatPaginatorModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  dataSource = input.required<any[]>();
  displayedColumns = input<string[]>();
  resultsLength = input<number>();

  onRowClicked = output<unknown>();
  onPageChanged = output<PageEvent>();

  onRowClick(row: unknown) {
    this.onRowClicked.emit(row);
  }

  onPageChange(e: PageEvent) {
    this.onPageChanged.emit(e);
  }
}
