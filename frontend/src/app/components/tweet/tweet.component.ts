import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tweet } from '../../model/tweet.interface';
import { TweetService } from '../../services/tweet.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AvatarModule } from 'primeng/avatar';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-tweet',
  standalone: true,
  imports: [CommonModule,FormsModule,SkeletonModule,
    CardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    VirtualScrollerModule,
    AvatarModule],
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent  {
  private tweetService = inject(TweetService);
   loading: boolean = true;
  skeletonArray: any[] = Array.from({ length: 10 }); // Array to iterate over for skeletons

  tweets: Tweet[] = [];
  newTweet: Tweet = {
    author: '',
    message: '',
    date: ''
  };

  SAMPLE_TWEETS: Tweet[] = [
  { author: 'Alice', message: 'Hello, world!', date: '2024-06-21T10:00:00Z' },
  { author: 'Bob', message: 'Angular is awesome!', date: '2024-06-22T09:00:00Z' },
  { author: 'Charlie', message: 'Enjoying a sunny day at the park.', date: '2024-06-21T12:00:00Z' },
  { author: 'Diana', message: 'Working on my new project!', date: '2024-06-20T15:00:00Z' },
  { author: 'Eve', message: 'Just had a great lunch!', date: '2024-06-22T11:30:00Z' },
  { author: 'Frank', message: 'Reading a fantastic book.', date: '2024-06-21T14:00:00Z' },
  { author: 'Grace', message: 'Running in the morning is refreshing!', date: '2024-06-20T07:00:00Z' },
  { author: 'Heidi', message: 'Coding with Angular Material.', date: '2024-06-22T08:45:00Z' },
  { author: 'Ivan', message: 'Watching a new movie tonight.', date: '2024-06-21T19:00:00Z' },
  { author: 'Judy', message: 'Trying out a new recipe.', date: '2024-06-20T18:00:00Z' }
];

  ngOnInit() {
        setTimeout(() => {
          this.tweets = this.SAMPLE_TWEETS
          this.loading = false;
    }, 3000);
  // this.getTweets();
  console.log(this.tweets)
  }

  getTweets() {
    this.tweetService.getTweets().subscribe({
      next: (tweets) => {
        // this.tweets = tweets;
        this.tweets = this.SAMPLE_TWEETS
        // this.sortTweets();
      },
      error: (error) => {
        console.error('Error fetching tweets', error);
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

  // sortTweets() {
  //   this.tweets.sort((a, b) => {
  //     if (a.date > b.date) return -1;
  //     if (a.date < b.date) return 1;
  //     return a.author.localeCompare(b.author);
  //   });
  // }
}
