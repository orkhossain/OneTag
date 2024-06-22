import { Routes } from '@angular/router';
import { TweetComponent } from './components/tweet/tweet.component'; // Adjust the import path as needed

export const routes: Routes = [
  { path: '', redirectTo: '/tweets', pathMatch: 'full' },
  { path: 'tweets', component: TweetComponent },
  { path: '**', redirectTo: '/tweets' }
];
