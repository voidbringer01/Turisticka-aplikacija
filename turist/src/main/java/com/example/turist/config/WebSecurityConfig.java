package com.example.turist.config;

import com.example.turist.service.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    public JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    public JwtRequestFilter jwtRequestFilter;

    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception{

        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests().antMatchers(HttpMethod.POST,"/authenticate/register").permitAll()
                .antMatchers(HttpMethod.POST,"/authenticate/login"  ).permitAll()
                .antMatchers(HttpMethod.GET,"/api/drzave").permitAll()
                .antMatchers(HttpMethod.GET,"/api/znamenitosti/{idDrzave}/{idOpstine}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/znamenitost/{id}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/znamenitosti/{name}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/prosecnaocena/{id}").permitAll()
                .antMatchers(HttpMethod.POST,"/api/ocena/{id}").permitAll()
                .antMatchers(HttpMethod.PUT,"/api/ocena/{id}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/ocena/{idZnamenitosti}/{idKorisnika}").permitAll()
                .antMatchers(HttpMethod.GET,"/api/znamenitosti/page/**").permitAll()
                .antMatchers(HttpMethod.PUT,"/api/znamenitosti").permitAll()
                .antMatchers(HttpMethod.POST,"/znamenitosti/{idDrzave}/{idOpstine}").permitAll()
                .antMatchers(HttpMethod.GET,"/uploads/**").permitAll()
                .anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource()
    {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200/"));
        configuration.setAllowedMethods(Arrays.asList("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);

        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
