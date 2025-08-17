package com.example.WorldWise_Backend.Controller;

import com.example.WorldWise_Backend.Model.City;
import com.example.WorldWise_Backend.Model.User;
import com.example.WorldWise_Backend.Repository.CityRepository;
import com.example.WorldWise_Backend.Repository.UserRepository;
import com.example.WorldWise_Backend.Service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = {"http://localhost:5173", "https://vermillion-biscuit-ddb073.netlify.app"})

public class CityController {
    @Autowired
    private CityService cityService;
    @Autowired
    private UserRepository userRepository;


    @GetMapping
    public List<City> getCities(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        System.out.println(user);
        return cityService.getCitiesByUser(user);
    }

    @PostMapping
    public City addCity(@RequestBody City city, @RequestParam String email){
        User user = userRepository.findByEmail(email).orElseThrow();
        city.setUser(user);
        return cityService.saveCity(city);
    }

    @DeleteMapping("/{id}")
    public void deleteCity(@PathVariable Long id){
        cityService.deleteCity(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id, @RequestParam String email) {
        City city = cityService.getCityByIdAndEmail(id, email);
        return ResponseEntity.ok(city);
    }

}
