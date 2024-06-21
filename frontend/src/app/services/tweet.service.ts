import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private apiUrl = 'http://your-api-url';

  constructor(private http: HttpClient) { }

  getTweets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tweets`);
  }

  postTweet(tweetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tweets`, tweetData);
  }
}
