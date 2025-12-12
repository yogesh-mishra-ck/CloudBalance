package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.util.JWTUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    AuthController(AuthenticationManager authenticationManager, JWTUtil jwtUtil){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String generateToken(@RequestBody AuthRequestDTO authRequestDTO){
        System.out.println("Inside cont");
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.getUsername(), authRequestDTO.getPassword())
            );
            return jwtUtil.generateToken(authRequestDTO.getUsername());
//            System.out.println("Hello");
//            return "yo";
        }catch (Exception e){
            throw e;
        }

    }

    @GetMapping("/healthy")
    public String checkHealth(){
        return "healthy";
    }
}
