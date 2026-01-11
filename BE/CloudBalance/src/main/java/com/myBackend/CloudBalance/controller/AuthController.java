package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.dto.AuthResponseDto;
import com.myBackend.CloudBalance.entity.RefreshToken;
import com.myBackend.CloudBalance.entity.User;
//import com.myBackend.CloudBalance.repository.SnowflakeRepository;
import com.myBackend.CloudBalance.repository.SnowflakeRepository;
import com.myBackend.CloudBalance.service.impl.RefreshTokenServiceImpl;
import com.myBackend.CloudBalance.service.impl.AuthServiceImpl;
import com.myBackend.CloudBalance.service.impl.UserServiceImpl;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserServiceImpl userService;
    private final AuthServiceImpl authService;
    private final RefreshTokenServiceImpl refreshTokenService;
    private final SnowflakeRepository snowflakeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequestDTO authRequestDTO, HttpServletResponse response){
        System.out.println("Inside controller");
        return authService.login(authRequestDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "token") String refreshToken){

        return authService.logout(refreshToken);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue(name = "token") String token){
        System.out.println(token);
        return authService.refreshToken(token);
    }

    @GetMapping("/healthy")
    @PreAuthorize("hasAnyRole('READ_ONLY', 'ADMIN')")
    public String checkHealth(){
        return "GET ==> healthy";
    }

    @PostMapping("/healthy")
    @PreAuthorize("hasRole('ADMIN')")
    public String checkHealthPost(){
        return "POST ==> healthy";
    }

//    @GetMapping("/snowflake")
//    public List<Map<String, Object>> checkSnowflake(){
//        return snowflakeRepository.getCost();
//    }
}
