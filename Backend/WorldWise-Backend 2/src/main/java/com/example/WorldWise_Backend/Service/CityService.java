package com.example.WorldWise_Backend.Service;

import com.example.WorldWise_Backend.Model.City;
import com.example.WorldWise_Backend.Model.User;
import com.example.WorldWise_Backend.Repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    @Autowired
    private CityRepository cityRepository;
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
    public City saveCity(City city) {
        return cityRepository.save(city);
    }

    public void deleteCity(long id) {
        cityRepository.deleteById(id);
    }

    public List<City> getCitiesByUser(User user) {
        return cityRepository.findAllByUser(user);
    }
    public City getCityByIdAndEmail(Long id, String email) {
        return cityRepository.findByIdAndUserEmail(id, email)
                .orElseThrow(() -> new RuntimeException("City not found for user"));
    }



}
