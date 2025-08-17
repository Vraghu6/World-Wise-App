package com.example.WorldWise_Backend.Model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;

@Embeddable
public class Position {
    private String lat;
    private String lng;

    public Position() {}


    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }


    public Position(String lat, String lng) {
        this.lat = lat;
        this.lng = lng;
    }
}
