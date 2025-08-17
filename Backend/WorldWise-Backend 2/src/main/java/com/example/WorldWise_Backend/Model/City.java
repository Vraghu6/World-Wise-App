package com.example.WorldWise_Backend.Model;
import com.example.WorldWise_Backend.Model.Position;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String cityName;
    private String country;
    private String emoji;
    private String date;

    private String notes;
//    private Double positionLat;
//    private Double positionLng;
    @Embedded
    private Position position;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
