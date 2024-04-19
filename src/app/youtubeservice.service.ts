import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class YoutubeserviceService {

  constructor(private http: HttpClient) { }
  private apiKey = "AIzaSyDA5oJkNqQXuLlw2iXE-mtiwCDtXX0_Ta8";
  fetchYoutubeData() {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((_res: any) => {
        return _res.items.map((_item: any) => {
          return {
            thumbnails: _item.snippet.thumbnails.default,
            publishedAt: new Date(_item.snippet.publishedAt).toLocaleString(),
            title: _item.snippet.title,
            description: _item.snippet.description,
            videoId: _item.id
          }
        })
      })
    )
  }
}

