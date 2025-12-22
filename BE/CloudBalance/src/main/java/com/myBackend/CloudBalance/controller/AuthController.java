package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.service.AuthService;
import com.myBackend.CloudBalance.service.UserService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private final AuthService authService;

    private User user = null;

    @PostMapping("/login")
    public ResponseEntity<?> generateToken(@Valid @RequestBody AuthRequestDTO authRequestDTO){
        System.out.println("Inside cont");

//        if(authRequestDTO.getEmail()==null || authRequestDTO.getEmail().isEmpty() || authRequestDTO.getPassword()==null || authRequestDTO.getPassword().isEmpty()){
//            throw new ValidationException();
//        }
//
//            authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
//            );
//
//           user = userService.getUser(authRequestDTO.getEmail());
//           String token =  jwtUtil.generateToken(authRequestDTO.getEmail(), "ROLE_"+user.getRole().name());
//



        String token = authService.generateToken(authRequestDTO);
        ResponseCookie responseCookie = ResponseCookie.from("JWT", token)
                .httpOnly(true)
                .path("/")
                .maxAge(15*60)
                .sameSite("Strict")
                .build();
           return ResponseEntity.ok()
                   .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                   .body(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(name = "JWT") String jwt){


        Boolean tokenInvalidated = authService.invalidateToken(jwt);

        ResponseCookie deleteCookie = ResponseCookie.from("JWT", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();
//        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());


        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, deleteCookie.toString()).build();

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
