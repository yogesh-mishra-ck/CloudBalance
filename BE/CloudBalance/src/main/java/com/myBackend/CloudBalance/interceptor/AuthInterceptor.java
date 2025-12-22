package com.myBackend.CloudBalance.interceptor;

import com.myBackend.CloudBalance.entity.Blacklist;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.BlacklistRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import com.myBackend.CloudBalance.service.UserService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.time.Duration;
import java.time.Instant;
import java.util.Collection;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class AuthInterceptor implements HandlerInterceptor {

    private final JWTUtil jwtUtil;
    private final UserDetailsRepository userDetailsRepository;
    private final UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("PreHandle: Intercepting request...");

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return true;
        }

        String token = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JWT".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if (token == null)
            return true;

//        if(isTokenBlacklisted(token)){ //blacklisted token
//            return true;
//        }

        Instant jwtExpiry = jwtUtil.getExpiration(token).toInstant();
        Instant currentTime = Instant.now();
        long remainingSecconds = Duration.between(currentTime, jwtExpiry).getSeconds();
        if (remainingSecconds <= 300) { //5 minutes i.e 5*60

            String username = authentication.getName();
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String role = authorities.iterator().next().getAuthority();

            String newJwtToken = jwtUtil.generateToken(username, role);
            Cookie cookie = new Cookie("JWT", newJwtToken);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(15 * 60);

            response.addCookie(cookie);
            System.out.println("New jwt token generated");
        }
        return true;
    }

//    public boolean isTokenBlacklisted(String token){
//        Blacklist blacklist = blacklistRepository.findBytokenId(token).orElseThrow(()-> new RuntimeException("Token was not present in db"));
//
//        return blacklist.isBlacklisted();
//
//    }
}