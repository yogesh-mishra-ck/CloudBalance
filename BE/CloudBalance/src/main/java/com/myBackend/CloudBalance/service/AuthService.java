package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import com.myBackend.CloudBalance.dto.AuthResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    public String generateToken( AuthRequestDTO authRequestDTO);
    public ResponseEntity<?> login(AuthRequestDTO authRequestDTO);
    public ResponseEntity<?> logout(String refreshToken);
    public ResponseEntity<?> refreshToken(String token);
}
