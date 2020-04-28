package com.info6150.pigeon.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//  private final JwtUtil jwtUtil;
  @Value("${auth0.audience}")
  private String audience;

  @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
  private String issuer;

//  @Autowired
//  public WebSecurityConfig(JwtUtil jwtUtil) {
//    this.jwtUtil = jwtUtil;
//  }
//
//  @Bean
//  public PasswordEncoder passwordEncoder() {
//    return NoOpPasswordEncoder.getInstance();
//  }

  @Bean
  JwtDecoder jwtDecoder() {
    NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
            JwtDecoders.fromOidcIssuerLocation(issuer);

    OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
    OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
    OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

    jwtDecoder.setJwtValidator(withAudience);

    return jwtDecoder;
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
    configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
            .cors()
            .and()
            .authorizeRequests()
            .mvcMatchers("/","/*","/**").authenticated()
            .and()
            .oauth2ResourceServer().jwt();
//    httpSecurity.csrf().disable()
//      .authorizeRequests()
//      .antMatchers("/","/*","/**").permitAll()
//      .anyRequest().authenticated()
//      .and().exceptionHandling()
//      .and().sessionManagement()
//      .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // DO NOT use @Autowired here, otherwise the web.ignoring() will not be fired.
    // httpSecurity.addFilter(new JwtRequestFilter(jwtUtil));
//    httpSecurity.addFilterBefore(new JwtRequestFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
//    httpSecurity.addFilterBefore(new ExceptionHandlerFilter(), JwtRequestFilter.class);
//    httpSecurity.addFilterAfter(new SimpleCORSFilter(), JwtRequestFilter.class);
  }

//  @Override
//  public void configure(WebSecurity web) throws Exception {
//    web.ignoring()
//      .antMatchers(HttpMethod.OPTIONS, "/","/*","/**")
//      .antMatchers(HttpMethod.POST, "/user") // allow create user without Authentication
//      .antMatchers(HttpMethod.POST, "/user/token"); // allow user credential validation
//  }
}

