package com.example.WorldWise_Backend.DTO;

import com.example.WorldWise_Backend.Model.User;
import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
