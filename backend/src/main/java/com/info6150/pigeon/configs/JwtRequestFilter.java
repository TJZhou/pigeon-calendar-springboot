package com.info6150.pigeon.configs;

import com.info6150.pigeon.exceptions.UserPermissionDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;

  @Autowired
  public JwtRequestFilter(JwtUtil jwtUtil) {
    this.jwtUtil = jwtUtil;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException, IOException {

    final String authorizationHeader = request.getHeader("Authorization");

    String username;
    String jwt;

    if(authorizationHeader == null)
      throw new UserPermissionDeniedException("Current User Doesn't Have Permission to Visit This Page");
    else if (!authorizationHeader.startsWith("Bearer "))
      throw new UserPermissionDeniedException("Invalid Authorization");
    else {
      jwt = authorizationHeader.substring(7);
      username = jwtUtil.extractUsername(jwt);
    }

    if(username == null )
      throw new UserPermissionDeniedException(("Invalid Token"));

    if (SecurityContextHolder.getContext().getAuthentication() == null) {
      if (!jwtUtil.validateToken(jwt, username))
        throw new UserPermissionDeniedException(("Invalid Token"));
    }
    chain.doFilter(request, response);
  }
}
