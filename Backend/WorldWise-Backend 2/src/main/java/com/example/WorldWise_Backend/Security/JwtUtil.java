package com.example.WorldWise_Backend.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "mysupersecretkeymysupersecretkey123456789101112131415"; // 32+ chars
    private final long EXPIRATION_TIME = 864000000;

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);
        return Jwts.builder().setSubject(email).setIssuedAt(now).setExpiration(expiryDate).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();

    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateToken(String token,  String email) {
        return email.equals(extractEmail(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }

}
