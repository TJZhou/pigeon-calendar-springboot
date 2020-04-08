package com.info6150.pigeon.configs;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  private final JwtUtil jwtUtil;

  @Autowired
  public WebSecurityConfig(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return NoOpPasswordEncoder.getInstance();
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {

    httpSecurity.csrf().disable()
      .authorizeRequests()
      .antMatchers("/","/*","/**").permitAll()
      .anyRequest().authenticated()
      .and().exceptionHandling()
      .and().sessionManagement()
      .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    // DO NOT use @Autowired here, otherwise the web.ignoring() will not be fired.
    // httpSecurity.addFilter(new JwtRequestFilter(jwtUtil));
    httpSecurity.addFilterBefore(new JwtRequestFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
    httpSecurity.addFilterBefore(new ExceptionHandlerFilter(), JwtRequestFilter.class);
    httpSecurity.addFilterAfter(new SimpleCORSFilter(), JwtRequestFilter.class);
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring()
      .antMatchers(HttpMethod.OPTIONS, "/","/*","/**")
      .antMatchers(HttpMethod.POST, "/user") // allow create user without Authentication
      .antMatchers(HttpMethod.POST, "/user/token"); // allow user credential validation
  }
}

