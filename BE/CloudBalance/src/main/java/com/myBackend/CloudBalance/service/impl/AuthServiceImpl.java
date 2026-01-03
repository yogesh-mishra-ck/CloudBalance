package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.dto.AuthRequestDTO;
//import com.myBackend.CloudBalance.entity.Blacklist;
import com.myBackend.CloudBalance.entity.User;
//import com.myBackend.CloudBalance.repository.BlacklistRepository;
import com.myBackend.CloudBalance.service.AuthService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final UserServiceImpl userService;
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



//    public boolean invalidateToken(String token) {
//        try{
//            Blacklist blacklist = new Blacklist(token, false);
////                    blacklistRepository.findBytokenId(token).orElseThrow(()-> new RuntimeException("Cant find tokenId"));
////            blacklist.setBlacklisted(false);
//            blacklistRepository.save(blacklist);
//            return true;
//        } catch (RuntimeException e) {
//            throw new RuntimeException(e+" error in blacklisting the token");
//        }
//    }
}
