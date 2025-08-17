package com.example.WorldWise_Backend.Repository;

import com.example.WorldWise_Backend.Model.City;
import com.example.WorldWise_Backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findAllByUser(User user);
    Optional<City> findByIdAndUserEmail(Long id, String email);

}
