package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.service.UserService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private User user = null;

    @PostMapping("/login")
    public ResponseEntity<String> generateToken(@Valid @RequestBody AuthRequestDTO authRequestDTO){
        System.out.println("Inside cont");

        if(authRequestDTO.getEmail()==null || authRequestDTO.getEmail().isEmpty() || authRequestDTO.getPassword()==null || authRequestDTO.getPassword().isEmpty()){
            throw new ValidationException();
        }

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
            );

           user = userService.getUser(authRequestDTO.getEmail());
           String token =  jwtUtil.generateToken(authRequestDTO.getEmail(), user.getRole().name());
           return ResponseEntity.ok().body(token);


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
