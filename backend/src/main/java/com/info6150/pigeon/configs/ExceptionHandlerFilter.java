package com.info6150.pigeon.configs;

import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Handle exceptions thrown in filters
 * Controller exceptions are handled in com.evicore.qaui.exceptions
 */
public class ExceptionHandlerFilter extends OncePerRequestFilter {

  @Override
  public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      filterChain.doFilter(request, response);
    } catch (RuntimeException e) {
      logger.warn(e.getMessage());
      // custom error response class used across my project
      response.sendError(HttpStatus.FORBIDDEN.value(), e.getMessage());
    }
  }
}
