package com.myBackend.CloudBalance.config;

import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.filters.JwtAuthFilter;
//import com.myBackend.CloudBalance.security.JwtAccessDeniedHandler;
import com.myBackend.CloudBalance.security.CustomAccessDeniedHandler;
import com.myBackend.CloudBalance.security.JwtAuthenticationEntryPoint;
import com.myBackend.CloudBalance.service.impl.CustomUserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private  JwtAuthFilter jwtAuthFilter;
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private CustomAccessDeniedHandler customAccessDeniedHandler;
//    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    SecurityConfig(JwtAuthFilter jwtAuthFilter, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, CustomAccessDeniedHandler accessDeniedHandler){
        this.jwtAuthFilter = jwtAuthFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.customAccessDeniedHandler = accessDeniedHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex ->
                                ex
                                        .accessDeniedHandler(customAccessDeniedHandler)
                                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )
                .logout(logout -> logout.disable())
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/refresh").permitAll()
                                .requestMatchers("/logout").permitAll()
//                                .requestMatchers(HttpMethod.GET, "/healthy").hasAuthority(Permissions.READ.name())
//                                .requestMatchers(HttpMethod.POST, "/healthy").hasAuthority(Permissions.WRITE.name())
                                .requestMatchers(HttpMethod.GET, "/user").hasAnyRole(Roles.READ_ONLY.name(), Roles.ADMIN.name())
                                .requestMatchers(HttpMethod.POST, "/user").hasAnyRole(Roles.ADMIN.name())
                                .requestMatchers(HttpMethod.PUT, "/user/**").hasAnyRole(Roles.ADMIN.name())

                                .requestMatchers("/me/**").authenticated()
                                .requestMatchers("/admin/**").hasRole(Roles.ADMIN.name())

                                //accounts
//                                .requestMatchers(HttpMethod.GET, "/user/account").hasRole(Roles.ADMIN.name()) //get all
//                                .requestMatchers(HttpMethod.POST,"/user/*/account").hasRole(Roles.ADMIN.name())
//                                .requestMatchers(HttpMethod.GET, "/user/*/account").hasAnyRole(Roles.CUSTOMER.name(), Roles.ADMIN.name()) //ALL accounts for user
//
//                                .requestMatchers("/{id}/account").hasAnyAuthority(Role.ADMIN,Role.CUSTOMER)
//                                .requestMatchers(HttpMethod.POST,"/account/**").hasAnyRole(Role.ADMIN)
//                                .requestMatchers("/account/**").hasAnyRole(Role.ADMIN, Role.CUSTOMER)

//                                .requestMatchers(HttpMethod.POST, HttpMethod.PUT, "/user").hasRole("ADMIN")
                                .anyRequest().authenticated());

        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(CustomUserDetailsServiceImpl customUserDetailsService, PasswordEncoder passwordEncoder){
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(customUserDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoAuthenticationProvider);

    }
}
