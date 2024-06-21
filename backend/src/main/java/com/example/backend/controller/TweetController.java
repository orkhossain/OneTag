package com.example.backend.controller;

import com.example.backend.model.Tweet;
import com.example.backend.repository.TweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tweets")
public class TweetController {
  @Autowired
  private TweetRepository tweetRepository;

  @GetMapping
  public List<Tweet> getAllTweets() {
    return tweetRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Tweet> getTweetById(@PathVariable Long id) {
    Optional<Tweet> tweet = tweetRepository.findById(id);
    return tweet.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping
  public Tweet createTweet(@RequestBody Tweet tweet) {
    tweet.setDate(LocalDateTime.now());
    return tweetRepository.save(tweet);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Tweet> updateTweet(@PathVariable Long id, @RequestBody Tweet tweetDetails) {
    Optional<Tweet> tweet = tweetRepository.findById(id);
    if (tweet.isPresent()) {
      Tweet existingTweet = tweet.get();
      existingTweet.setAuthor(tweetDetails.getAuthor());
      existingTweet.setMessage(tweetDetails.getMessage());
      existingTweet.setDate(LocalDateTime.now());
      Tweet updatedTweet = tweetRepository.save(existingTweet);
      return ResponseEntity.ok(updatedTweet);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTweet(@PathVariable Long id) {
    if (tweetRepository.existsById(id)) {
      tweetRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
