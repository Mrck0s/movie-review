package com.example.back.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    Follow findByFollowerIdAndFollowedId(Integer followerId, Integer followedId);
    Integer countByFollowerId(Integer followerId);
    Integer countByFollowedId(Integer followedId);
    void deleteByFollowerIdAndFollowedId(Integer followerId, Integer followedId);
    List<Follow> findAllByFollowerId(Integer followerId);
    List<Follow> findAllByFollowedId(Integer followedId);

    Integer countAllByFollowerId(Integer id);
    Integer countAllByFollowedId(Integer id);
}
