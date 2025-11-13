package com.cfs.tinytrail.security;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class JWTAuthenticationResponse {

    private String token;
}
