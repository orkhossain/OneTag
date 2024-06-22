import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tweet } from '../../model/tweet.interface';
import { TweetService } from '../../services/tweet.service';

@Component({
  selector: 'app-new-tweet',
  standalone: true,
  imports: [],
  templateUrl: './new-tweet.component.html',
  styleUrl: './new-tweet.component.css'
})
export class NewTweetComponent {

  private tweetService = inject(TweetService);

  newTweet: Tweet = {
    author: '',
    message: '',
    date: ''
  };

    postNewTweet() {
    this.newTweet.date = new Date().toISOString();
    this.tweetService.postTweet(this.newTweet).subscribe({
      next: (response) => {
        console.log('Tweet posted successfully', response);
      },
      error: (error) => {
        console.error('Error posting tweet', error);
      }
    });
  }

}
