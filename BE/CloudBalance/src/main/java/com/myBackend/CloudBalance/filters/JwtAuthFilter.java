package com.myBackend.CloudBalance.filters;

import com.myBackend.CloudBalance.entity.Blacklist;
import com.myBackend.CloudBalance.repository.BlacklistRepository;
import com.myBackend.CloudBalance.service.CustomUserDetailsService;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final BlacklistRepository blacklistRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String path = request.getServletPath();
        if(path.startsWith("login") || path.startsWith("refresh")){
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !(authHeader.startsWith("Bearer "))){
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);


//        Cookie[] cookies = request.getCookies();
//        String token = null;
//        String username = null;
//
//        if(cookies != null ){
//            for(Cookie cookie: cookies){
//                if("token".equals(cookie.getName())){
//                    token = cookie.getValue();
//                    break;
//                }
//            }
//        }
        String username = null;
        if(!token.isEmpty() ){
            try{
                username = jwtUtil.extractUsername(token);
                if(username!=null && SecurityContextHolder.getContext().getAuthentication() == null){
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    if(jwtUtil.validateToken(username, userDetails, token)){

                        //blacklist logic
//                        if(!isTokenBlacklisted(token)){
                            UsernamePasswordAuthenticationToken authenticationToken =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//                            System.out.println("JWT Authenticated: " + authenticationToken.getAuthorities());
//
//                        }
                    }else{
                        System.out.println("JWT token invalid");
                        SecurityContextHolder.clearContext();

                    }
                }
            }catch (Exception e){
                System.out.println("Jwt token invalid or expired!!!");
                SecurityContextHolder.clearContext();
            }
        }


        filterChain.doFilter(request, response);
    }

    public boolean isTokenBlacklisted(String token){
        Optional<Blacklist> blacklist = blacklistRepository.findBytokenId(token);
        if(blacklist.isEmpty()) return false;

        return blacklist.get().isBlacklisted();

    }
}
