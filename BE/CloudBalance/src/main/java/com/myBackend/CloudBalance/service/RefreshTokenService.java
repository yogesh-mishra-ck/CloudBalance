package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.entity.RefreshToken;

import java.util.Optional;

public interface RefreshTokenService {
    public RefreshToken createRefreshToken(String email);
    public Optional<RefreshToken> findByToken(String token);
    public boolean verifyExpiration(RefreshToken refreshToken);
    public RefreshToken roatate(RefreshToken oldRefreshToken);
    public void deleteByToken(String refreshToken);
}
