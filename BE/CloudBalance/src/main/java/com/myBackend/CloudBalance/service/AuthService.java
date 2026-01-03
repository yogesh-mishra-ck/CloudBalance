package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
import jakarta.validation.Valid;

public interface AuthService {
    public String generateToken(@Valid AuthRequestDTO authRequestDTO);
}
