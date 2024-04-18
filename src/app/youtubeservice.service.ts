import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeserviceService {

  constructor(private http: HttpClient) { }

  private apiKey = "AIzaSyDA5oJkNqQXuLlw2iXE-mtiwCDtXX0_Ta8";
  // private apiKey = "https://jsonplaceholder.typicode.com/users";

  fetchYoutubeData() {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
