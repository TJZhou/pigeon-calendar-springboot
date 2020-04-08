package com.info6150.pigeon.configs;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil{

  private final Key SECRET_KEY = io.jsonwebtoken.security.Keys.secretKeyFor(SignatureAlgorithm.HS256);
  private final String ISSUER = "pigeon-calendar";
  private final String AUDIENCE = "pigeon-calendar";
  private final Long VALID_TIME = 24 * 60 * 60 * 1000L;

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }
  private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }

  public String generateToken(UserDetails userDetails) {
    Long cur = System.currentTimeMillis();
    Claims claims = Jwts.claims();
    claims.setSubject(userDetails.getUsername());
    claims.setAudience(AUDIENCE);
    claims.setIssuer(ISSUER);
    claims.setIssuedAt(new Date(cur));
    claims.setExpiration(new Date(cur + VALID_TIME));
    return createToken(claims);
  }

  private String createToken(Map<String, Object> claims) {
    return Jwts.builder()
      .setClaims(claims)
      .signWith(SECRET_KEY).compact();
  }

  public Boolean validateToken(String token, String username) {
    Claims claims = extractAllClaims(token);
    return (claims.getSubject().equals(username)
      && claims.getIssuer().equals(ISSUER)
      && claims.getAudience().equals(AUDIENCE)
      && !isTokenExpired(token)
    );
  }
}
