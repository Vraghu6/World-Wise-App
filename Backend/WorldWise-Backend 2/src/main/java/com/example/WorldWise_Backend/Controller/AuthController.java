package com.example.WorldWise_Backend.Controller;

import com.example.WorldWise_Backend.DTO.AuthResponse;
import com.example.WorldWise_Backend.Model.User;
import com.example.WorldWise_Backend.Repository.UserRepository;
import com.example.WorldWise_Backend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "https://vermillion-biscuit-ddb073.netlify.app"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User newUser) {
        // Hash password before saving
        String hashedPassword = passwordEncoder.encode(newUser.getPassword());
        newUser.setPassword(hashedPassword);
        User savedUser = userRepository.save(newUser);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User newUser) {
        Optional<User> userOptional = userRepository.findByEmail(newUser.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        User user = userOptional.get();

        // Use passwordEncoder.matches() to check raw vs hashed
        if (!passwordEncoder.matches(newUser.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        AuthResponse authResponse = new AuthResponse(token, user);
        return ResponseEntity.ok(authResponse);
    }


}
