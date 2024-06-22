import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../model/tweet.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private http = inject(HttpClient);
  private apiUrl = 'http://your-api-url';
  constructor() { }

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(`${this.apiUrl}/tweets`);
  }

  postTweet(tweetData: Tweet): Observable<Tweet> {
    return this.http.post<Tweet>(`${this.apiUrl}/tweets`, tweetData);
  }
}
