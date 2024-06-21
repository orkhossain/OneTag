import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../model/tweet.interface';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TweetComponent implements OnInit {
  tweets: Tweet[] = [];
  newTweet: any = {
    author: '',
    message: '',
    date: ''
  };

  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() {
    this.tweetService.getTweets().subscribe({
      next: (tweets) => {
        this.tweets = tweets;
        this.sortTweets();
      },
      error: (error) => {
        console.error('Error fetching tweets', error);
      }
    });
  }

  postNewTweet() {
    this.newTweet.date = new Date().toISOString();
    this.tweetService.postTweet(this.newTweet).subscribe({
      next: (response) => {
        console.log('Tweet posted successfully', response);
        this.getTweets(); // Refresh tweets after posting
        this.resetForm();
      },
      error: (error) => {
        console.error('Error posting tweet', error);
      }
    });
  }

  resetForm() {
    this.newTweet = {
      author: '',
      message: '',
      date: ''
    };
  }

  sortTweets() {
    this.tweets.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return a.author.localeCompare(b.author);
    });
  }
}
