package com.myBackend.CloudBalance.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.management.relation.Role;
import java.security.Key;
import java.time.Instant;
import java.util.Date;

@Component
//@RequiredArgsConstructor
public class JWTUtil {

    @Value("${jwtSecret}")
    private String SECRET;

    private SecretKey key;

    @PostConstruct
    public void init(){
        if(SECRET == null || SECRET.isEmpty()){
            throw new RuntimeException("JWT SECRET not able to use");
        }
        key = Keys.hmacShaKeyFor(SECRET.getBytes());
    }
//    private String SECRET = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b2dlc2htaXNocmFAZ21haWwuY29tIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY1OTQ4NTUyLCJleHAiOjE3NjU5NDk0NTJ9.1w3f-Vf7ldyf0wp_C0T0poo-Vw6QMTQ4KFE_5z_u01Q";

//    private final long EXPIRATION_TIME = 1000*60*15; //15 minutes
    private final long EXPIRATION_TIME = 1000*60;

    public String generateToken(String email, String role){
        return Jwts
                .builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

    }

    public Claims extractClaims(String token){
        return Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseSignedClaims(token)
                .getBody();
    }
    public String extractUsername(String token){
        return extractClaims(token).getSubject();

    }

    public boolean validateToken(String username, UserDetails userDetails, String token) {
        return username.equals(userDetails.getUsername()) && !isTokenEpired(token);
    }

    public boolean isTokenEpired(String token){
        return extractClaims(token).getExpiration().before(new Date());
    }
    public Date getExpiration(String token){
        return extractClaims(token).getExpiration();
    }

//    public boolean isExpiringSoon(String token, long seconds) {
//        Date expiration = extractClaims(token).getExpiration();
//        return expiration.toInstant()
//                .isBefore(Instant.now().plusSeconds(seconds));

//        boolean isExpiring = e
//    }
}
