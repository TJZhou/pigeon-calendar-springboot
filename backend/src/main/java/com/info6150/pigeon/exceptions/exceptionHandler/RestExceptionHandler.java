package com.info6150.pigeon.exceptions.exceptionHandler;

import com.info6150.pigeon.exceptions.*;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.ServletException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class RestExceptionHandler {
  private final Logger log = LoggerFactory.getLogger(RestExceptionHandler.class);

  @ExceptionHandler(value = {UserNotFoundException.class})
  public ResponseEntity<Map<String, String>> userNotFount(UserNotFoundException ex) {
    log.warn("Handling UserNotFoundException: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {PasswordNotMatchException.class})
  public ResponseEntity<Map<String, String>> passwordNotMatch(PasswordNotMatchException ex) {
    log.warn("Handling PasswordNotMatchException: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {UserAlreadyExistsException.class})
  public ResponseEntity<Map<String, String>> userAlreadyExists(UserAlreadyExistsException ex) {
    log.warn("Handling UserAlreadyExistsException: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {SignatureException.class})
  public ResponseEntity<Map<String, String>> invalidSignature(SignatureException ex) {
    log.warn("Handling Invalid Token Exception: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {ServletException.class})
  public ResponseEntity<Map<String, String>> servletException(ServletException ex) {
    log.warn("Handling Servlet Exception: " + ex.getMessage());
    return setResponseEntity(ex, "serverErrors", HttpStatus.INTERNAL_SERVER_ERROR);
  }


  @ExceptionHandler(value = {BadCredentialsException.class})
  public ResponseEntity<Map<String, String>> badCredentialsException(BadCredentialsException ex) {
    log.warn("Incorrect username or password");
    return setResponseEntity(ex, "errors", HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(value = {InternalAuthenticationServiceException.class})
  public ResponseEntity<Map<String, String>> internalAuthenticationServiceException(InternalAuthenticationServiceException ex) {
    log.warn("Handle Internal Authentication Exception: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(value = {UserPermissionDeniedException.class})
  public ResponseEntity<Map<String, String>> userPermissionDeniedException(UserPermissionDeniedException ex) {
    log.warn(" User Permission Denied: " + ex.getMessage());
    return setResponseEntity(ex, "errors", HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(value = {Exception.class})
  public ResponseEntity<Map<String, String>> internalServerErrors(Exception ex) {
    ex.printStackTrace();
    return setResponseEntity(ex, "serverErrors", HttpStatus.INTERNAL_SERVER_ERROR);
  }

  private ResponseEntity<Map<String, String>> setResponseEntity(Exception ex, String error, HttpStatus httpStatus) {
    Map<String, String> map = new HashMap<>();
    map.put(error, ex.getMessage());
    return new ResponseEntity<>(map, httpStatus);
  }
}
