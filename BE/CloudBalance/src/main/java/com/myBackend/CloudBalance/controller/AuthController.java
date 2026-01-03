package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.entity.RefreshToken;
import com.myBackend.CloudBalance.entity.User;
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

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserServiceImpl userService;
    private final AuthServiceImpl authService;
    private final RefreshTokenServiceImpl refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody AuthRequestDTO authRequestDTO, HttpServletResponse response){
        System.out.println("Inside controller");

        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword()) );
        if(authentication.isAuthenticated()){
            System.out.println("Hi "+authRequestDTO.getEmail());
            System.out.println("Hi 2" + authRequestDTO.getPassword());
            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequestDTO.getEmail());
            User user = userService.getUser(authRequestDTO.getEmail());
            String accessToken = jwtUtil.generateToken(authRequestDTO.getEmail(), "ROLE_"+ user.getRole().name());
            ResponseCookie responseCookie = ResponseCookie.from("token", refreshToken.getToken())
                    .httpOnly(true)
                    .path("/")
                    .maxAge(15*60)
                    .sameSite("Strict")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
            return ResponseEntity.ok().body(accessToken);
        }else{
            throw  new UsernameNotFoundException("Invalid user request");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "token") String refreshToken){

        if(refreshToken!=null){
            refreshTokenService.deleteByToken(refreshToken);
        }

        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, deleteCookie.toString()).build();
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshToken(HttpServletRequest request, HttpServletResponse response){

        Cookie[] requestCookies = request.getCookies();
        String token = null;
        if(requestCookies != null){
            for(Cookie cookie : requestCookies){
                if("token".equals(cookie.getName())){
                    token = cookie.getValue();
                    break;
                }
            }
        }

        RefreshToken refreshToken = refreshTokenService.findByToken(token).orElseThrow(()-> new RuntimeException("Refresh token is not in db"));
        if(refreshTokenService.verifyExpiration(refreshToken)){
            User userFound = refreshToken.getUser();
            String accessToken = jwtUtil.generateToken(userFound.getEmail(), userFound.getRole().toString());

            RefreshToken newRefreshToken = refreshTokenService.roatate(refreshToken);

            ResponseCookie responseCookie = ResponseCookie.from("token", newRefreshToken.getToken())
                    .httpOnly(true)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Strict")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

            return ResponseEntity.ok().body(accessToken);
        }else{
            throw  new RuntimeException("Refresh token is not in db");
        }

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
}
