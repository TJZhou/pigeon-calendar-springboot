package com.info6150.pigeon.model;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

  private final String access_token;

  public AuthenticationResponse(String access_code) {
    this.access_token = access_code;
  }

  public String getAccess_token() {
    return access_token;
  }
}
