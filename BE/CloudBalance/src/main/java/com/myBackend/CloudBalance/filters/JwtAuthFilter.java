package com.myBackend.CloudBalance.filters;

//import com.myBackend.CloudBalance.repository.BlacklistRepository;
import com.myBackend.CloudBalance.service.impl.CustomUserDetailsServiceImpl;
import com.myBackend.CloudBalance.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;
    private final CustomUserDetailsServiceImpl customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(request.getRequestURL().equals("/login")&& request.getMethod().equals("POST")){
            doFilter(request,response,filterChain);
            return;
        }

        System.out.println("All Cookies!");
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("Cookie name: " + cookie.getName());
            }
        } else {
            System.out.println("No cookies found");
        }

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

        String username;
        if(!token.isEmpty() ){
            try{
                username = jwtUtil.extractUsername(token);
                if(username!=null && SecurityContextHolder.getContext().getAuthentication() == null){
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                    if(jwtUtil.validateToken(username, userDetails, token)){

                            UsernamePasswordAuthenticationToken authenticationToken =
                                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//                            System.out.println("JWT Authenticated: " + authenticationToken.getAuthorities());
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
}
