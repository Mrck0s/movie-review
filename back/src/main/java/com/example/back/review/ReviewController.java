package com.example.back.review;

import com.example.back.rating.Rating;
import com.example.back.rating.RatingRepository;
import com.example.back.user.User;
import com.example.back.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final RatingRepository ratingRepository;

    @PostMapping(value = "/review")
    public Review handleReview(@RequestBody ReviewRequest reviewRequest) {
        User user = userRepository.findUserByUsername(reviewRequest.getUsername());
        Review actualReview = reviewRepository.findByMovieIdAndUserId(reviewRequest.getMovieId(), user.getId());
        Rating actualRating = ratingRepository.findByMovieIdAndUserId(reviewRequest.getMovieId(), user.getId());
        if (actualReview == null) {
            Review review = Review.builder()
                    .movieId(reviewRequest.getMovieId())
                    .review(reviewRequest.getReview())
                    .rating(actualRating)
                    .user(user)
                    .build();
            reviewRepository.save(review);
            return review;
        } else {
            actualReview.setReview(reviewRequest.getReview());
            reviewRepository.save(actualReview);
            return actualReview;
        }
    }

    @GetMapping(value = "/getReview")
    public ResponseEntity<ReviewResponse> getReview(@RequestParam Integer movieId, @RequestParam String username) {
        User user = userRepository.findUserByUsername(username);
        Review review = reviewRepository.findByMovieIdAndUserId(movieId, user.getId());
        if (review == null) {
            return ResponseEntity.ok(ReviewResponse.builder()
                    .id(null)
                    .build());
        } else {
            return ResponseEntity.ok(ReviewResponse.builder()
                    .id(review.getId())
                    .build());
        }
    }

}
