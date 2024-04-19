import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColDef, GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { YoutubeserviceService } from '../youtubeservice.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import { CellRendererComponent } from '../cell-renderer/cell-renderer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private YoutubeserviceService: YoutubeserviceService, private sanitizer: DomSanitizer) { }

  youtubeList: any[] = [];
  selectedCount: number = 0;
  gridApi: GridApi | undefined;
  gridOptions: GridOptions = { rowSelection: 'multiple' };
  visibility: boolean = true;



  ngOnInit(): void {
    this.getYoutubeData();
  }
  public colDefs: ColDef[] = [
    { headerName: '', field: 'checkbox', headerCheckboxSelection: true, checkboxSelection: true, cellRenderer: 'checkboxRenderer', width: 50 },
    { headerName: 'Thumbainls', field: 'thumbnails', cellRenderer: (ui: any) => this.thumbnailRenderer(ui) },
    { headerName: 'Published On', field: 'publishedAt' },
    { headerName: 'Video Title', field: 'title', cellRenderer: (_video: any) => this.videoTitleRenderer(_video), maxWidth: 500, minWidth: 500 },
    { headerName: 'Description', field: 'description', cellRenderer: (_description: any) => this.descriptionRenderer(_description), maxWidth: 500, minWidth: 500 },
  ];

  getYoutubeData() {
    this.YoutubeserviceService.fetchYoutubeData().subscribe((_data: any[]) => {
      this.youtubeList = _data.map(_item => ({
        ..._item,
      }));
    }, error => {
      console.error('Error fetching YouTube data:', error);
    });
  };

  descriptionRenderer(params: any) {
    const _desc = params.data.description;
    const _truncateDesc = _desc.length > 50 ? _desc.substring(0, 60) + '...' : _desc;
    const element = document.createElement('div');
    element.innerHTML = `<div title="${_desc}" style="cursor: pointer;">${_truncateDesc}</div>`;
    return element;
  }


  thumbnailRenderer(params: ICellRendererParams) {
    const { data: { thumbnails } } = params
    const thumbnailsimg = `<img src="${thumbnails.url}" alt="Video Thumbnail" width="${thumbnails.width}" height="${thumbnails.height}">`;
    return thumbnailsimg
  }

  videoTitleRenderer(item: any): SafeHtml {
    const { data } = item;
    const videoId = data.videoId;
    const safeLink = `https://www.youtube.com/watch?v=${videoId}`;
    const videoLink = `<a href="${safeLink}" target="_blank">${data.title}</a>`;
    return videoLink
  }

  toggleSelection() {
    this.visibility = !this.visibility;
    this.gridApi?.setColumnsVisible(['checkbox'], this.visibility);
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridOptions = params.api;
  }

  onSelectionChanged() {
    if (this.gridApi) {
      this.selectedCount = this.gridApi?.getSelectedRows().length || 0;
    }
  };

  onCellClicked(event: any) {
    if (event.column.colId !== 'checkbox') {
      const node = event.node;
      if (node.isSelected()) {
        node.setSelected(false);
      } else {
        node.setSelected(true);
      }
    }
  };
}
