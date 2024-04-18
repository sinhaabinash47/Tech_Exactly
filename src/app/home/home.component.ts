import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { YoutubeserviceService } from '../youtubeservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private YoutubeserviceService: YoutubeserviceService) { }

  youtubeList: any[] = [];

  ngOnInit(): void {
    this.getYoutubeData();
  }

  colDefs = [
    // { headerName: 'Checkbox', field: 'checkbox', checkboxSelection: true, width: 100  },
    { headerName: 'Thumbnail', field: 'snippet.thumbnails.default.url', cellRenderer: 'thumbnailRenderer', width: 100 },
    { headerName: 'Published On', field: 'snippet.publishedAt' },
    { headerName: 'Video Title', field: 'snippet.title', cellRenderer: 'linkRenderer' },
    { headerName: 'Description', field: 'snippet.description' },
    { headerName: 'Channel Title', field: 'snippet.channelTitle' }
  ];

  getYoutubeData() {
    this.YoutubeserviceService.fetchYoutubeData().subscribe((response: any) => {
      this.youtubeList = response.items;
      console.log(response)
    }, error => {
      console.error('Error fetching YouTube data:', error);
    });
  }
}
