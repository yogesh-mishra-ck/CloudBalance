package com.myBackend.CloudBalance.security;

import com.myBackend.CloudBalance.entity.RefreshToken;
import com.myBackend.CloudBalance.repository.RefreshTokenRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private  final RefreshTokenRepository refreshTokenRepository;
    private final UserDetailsRepository userDetailsRepository;

    public RefreshToken createRefreshToken(String email){

        String token = UUID.randomUUID().toString();

        RefreshToken refreshToken = RefreshToken.builder()
                .user(userDetailsRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not valid")))
                .token(token)
                .expiryDate(Instant.now().plusSeconds(24*60*60))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token){
        return refreshTokenRepository.findByToken(token);
    }
    public boolean verifyExpiration(RefreshToken refreshToken){
        if(refreshToken.getExpiryDate().isBefore(Instant.now())){
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException(refreshToken.getToken()+ " Refresh Token is expired! Login again");
//            return false;
        }
        return true;
    }

    @Transactional
    public RefreshToken roatate(RefreshToken oldRefreshToken) {

        refreshTokenRepository.delete(oldRefreshToken);

        RefreshToken newRefreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(24*60*60))
                .user(oldRefreshToken.getUser())
                .build();
        return refreshTokenRepository.save(newRefreshToken);
    }

    @Transactional
    public void deleteByToken(String refreshToken) {
        refreshTokenRepository.deleteByToken(refreshToken);
    }
}
