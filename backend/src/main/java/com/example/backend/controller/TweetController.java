package com.example.backend.controller;

import com.example.backend.model.Tweet;
import com.example.backend.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tweets")
public class TweetController {

  @Autowired
  private TweetRepository tweetRepository;

  @GetMapping
  public List<Tweet> getAllTweets() {
    List<Tweet> tweets = tweetRepository.findAll();
    // Format dates for response
    tweets.forEach(tweet -> tweet.setFormattedDate(tweet.formatDateForResponse()));
    return tweets;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Tweet> getTweetById(@PathVariable Long id) {
    Optional<Tweet> tweet = tweetRepository.findById(id);
    if (tweet.isPresent()) {
      Tweet formattedTweet = tweet.get();
      formattedTweet.setFormattedDate(formattedTweet.formatDateForResponse());
      return ResponseEntity.ok(formattedTweet);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Tweet createTweet(@RequestBody Tweet tweet) {
    tweet.setDateEpoch(Instant.now().getEpochSecond());
    return tweetRepository.save(tweet);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Tweet> updateTweet(@PathVariable Long id, @RequestBody Tweet tweetDetails) {
    Optional<Tweet> optionalTweet = tweetRepository.findById(id);
    if (optionalTweet.isPresent()) {
      Tweet existingTweet = optionalTweet.get();
      existingTweet.setAuthor(tweetDetails.getAuthor());
      existingTweet.setMessage(tweetDetails.getMessage());
      existingTweet.setDateEpoch(Instant.now().getEpochSecond());
      Tweet updatedTweet = tweetRepository.save(existingTweet);
      return ResponseEntity.ok(updatedTweet);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTweet(@PathVariable Long id) {
    if (tweetRepository.existsById(id)) {
      tweetRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
