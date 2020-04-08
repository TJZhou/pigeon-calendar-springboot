package com.info6150.pigeon.exceptions;

public class UserPermissionDeniedException extends RuntimeException {
  public UserPermissionDeniedException(String message) {
    super(message);
  }
}
