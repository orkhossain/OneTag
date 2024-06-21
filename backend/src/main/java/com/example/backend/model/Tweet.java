package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Entity
public class Tweet {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String author;
  private String message;
  private Long dateEpoch;

  // Getters and setters
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Long getDateEpoch() {
    return dateEpoch;
  }

  public void setDateEpoch(Long dateEpoch) {
    this.dateEpoch = dateEpoch;
  }

  public String formatDateForResponse() {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")
        .withZone(ZoneId.systemDefault());
    return formatter.format(Instant.ofEpochSecond(this.dateEpoch));
  }

  // public String getFormattedDate() {
  // if (dateEpoch == null) {
  // return "";
  // }
  // LocalDateTime date =
  // LocalDateTime.ofInstant(Instant.ofEpochSecond(dateEpoch),
  // ZoneId.systemDefault());
  // DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm - dd/MM/yyyy
  // 'GMT'");
  // return date.format(formatter);
  // }

  private String formattedDate;

  public void setFormattedDate(String formattedDate) {
    this.formattedDate = formattedDate;
  }

  public String getFormattedDate() {
    return formattedDate;
  }
}
