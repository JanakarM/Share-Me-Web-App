package com.learning.server.security.filter_chain;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.RequestMatcherRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.BASIC_AUTH_ORDER-10)
public class ApplicationSecurityConfig {
    @Bean
    public SecurityFilterChain createFilterChain(HttpSecurity http) throws Exception{
        return http.csrf(csrf-> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())).
                authorizeHttpRequests(auth->
                        auth
                                .antMatchers("/user/login", "/").permitAll()
                                .antMatchers("/static/**").permitAll()
                                .antMatchers("/**").authenticated()
//                                .antMatchers("/feed").hasRole("USER")
//                                .antMatchers("/feed/").hasRole("ADMIN")
                )
                .addFilterBefore(new RequestMatcherRedirectFilter(ApplicationSecurityConfig::checkRedirection, "/"), UsernamePasswordAuthenticationFilter.class)
                .build();
    }
    static boolean checkRedirection(HttpServletRequest request){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        return !request.getRequestURI().equals("/") && !request.getRequestURI().equals("/user/login") && !request.getRequestURI().equals("/user/me") && !request.getRequestURI().contains("/static/") && (auth == null || !(auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)));
    }
}
