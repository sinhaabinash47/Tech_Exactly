import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  toggleButtonText: string = 'Hide Selection Mode';
  
  @Input() totalCount!: number;
  @Input() selectedCount!: number;
  @Input() gridApi?: GridApi;
  @Input() gridOptions!: GridOptions;
  @Output() toggleSelection = new EventEmitter<string>();
  @Input() colDefs!: ColDef[];

  toggleSelectionMode() {
    if (this.gridApi && this.gridOptions && this.gridOptions.rowSelection) {
      const _checkboxColumn = this.colDefs.find(col => col.field === 'checkbox');
      if (_checkboxColumn) {
        _checkboxColumn.hide = !_checkboxColumn.hide;
        this.toggleButtonText = _checkboxColumn.hide ? 'Show Selection Mode' : 'Hide Selection Mode';
      }
      console.log(_checkboxColumn, '_checkboxColumn');
      this.gridApi.refreshHeader();
      // this.toggleSelection.emit("toggle");
      // this.gridApi.refreshHeader();
    } else {
      console.error('Grid API or Grid Options are not available or rowSelection is not defined.');
    }
  }
}
