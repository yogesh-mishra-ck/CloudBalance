package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
//import com.myBackend.CloudBalance.entity.Blacklist;
import com.myBackend.CloudBalance.dto.AuthResponseDto;
import com.myBackend.CloudBalance.entity.RefreshToken;
import com.myBackend.CloudBalance.entity.User;
//import com.myBackend.CloudBalance.repository.BlacklistRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import com.myBackend.CloudBalance.service.AuthService;
import com.myBackend.CloudBalance.service.RefreshTokenService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserServiceImpl userService;
    private final RefreshTokenService refreshTokenService;
    private final UserDetailsRepository userDetailsRepository;
//    private final BlacklistRepository blacklistRepository;
    private User user = null;


    public String generateToken(@Valid AuthRequestDTO authRequestDTO) {
        if(authRequestDTO.getEmail()==null || authRequestDTO.getEmail().isEmpty() || authRequestDTO.getPassword()==null || authRequestDTO.getPassword().isEmpty()){
            throw new ValidationException();
        }

                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
                );

        user = userService.getUser(authRequestDTO.getEmail());
        String token =  jwtUtil.generateToken(authRequestDTO.getEmail(), "ROLE_"+user.getRole().name());
        return token;
    }

    @Override
    public ResponseEntity<?> logout(String refreshToken){
        if(refreshToken!=null){
            refreshTokenService.deleteByToken(refreshToken);
        }

        ResponseCookie deleteCookie = ResponseCookie.from("token", "")
                .httpOnly(true)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .secure(false)
                .build();
        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, deleteCookie.toString()).build();
    }

    @Override
    public ResponseEntity<?> refreshToken(String token){

        System.out.println(token);
        RefreshToken refreshToken = refreshTokenService.findByToken(token).orElseThrow(()-> new RuntimeException("Refresh token is not in db"));
        if(refreshTokenService.verifyExpiration(refreshToken)){
            User userFound = refreshToken.getUser();
            String accessToken = jwtUtil.generateToken(userFound.getEmail(), userFound.getRole().toString());

            RefreshToken newRefreshToken = refreshTokenService.roatate(refreshToken);

            ResponseCookie responseCookie = ResponseCookie.from("token", newRefreshToken.getToken())
                    .httpOnly(true)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax")
                    .secure(false)
                    .build();

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(accessToken);
        }else{
            throw  new RuntimeException("Refresh token is not in db");
        }
    }


    @Override
    @Transactional //user's last login update + refreshToken saved in db
    public ResponseEntity<?> login(AuthRequestDTO authRequestDTO) {
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword()) );
        if(authentication.isAuthenticated()){

            RefreshToken refreshToken = refreshTokenService.createRefreshToken(authRequestDTO.getEmail());
            User user = userService.getUser(authRequestDTO.getEmail());

//            *********************


            user.setLastLogin(Instant.now());
            userDetailsRepository.save(user);



//            *********************

            String accessToken = jwtUtil.generateToken(authRequestDTO.getEmail(), "ROLE_"+ user.getRole().name());
            ResponseCookie responseCookie = ResponseCookie.from("token", refreshToken.getToken())
                    .httpOnly(true)
                    .path("/")
                    .maxAge(24*60*60)
                    .sameSite("Lax") //allows cookies to be sent from different ports(8080,5173) when frontend calls it
                    .secure(false)
                    .build();
//
            AuthResponseDto authResponseDto = new AuthResponseDto(user.getId(), user.getFirstName(), user.getLastName(), user.getRole().name(), accessToken);
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(authResponseDto);
        }else{
            throw  new UsernameNotFoundException("Invalid user request");
        }
    }


}
