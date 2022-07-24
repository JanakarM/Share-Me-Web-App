package com.learning.rest_service.security.filter_chain;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER-10)
public class ApplicationSecurityConfig {
    @Bean
    public SecurityFilterChain createFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(csrf-> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())).
                authorizeHttpRequests(auth->
                        auth.
                                antMatchers("/user/login", "/").permitAll().
                                antMatchers("/**").authenticated()
//                                antMatchers("/feed").hasRole("USER").
//                                antMatchers("/feed/").hasRole("ADMIN")
                ).
                build();
    }
}
