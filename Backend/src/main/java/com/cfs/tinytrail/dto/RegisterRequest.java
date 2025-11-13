package com.cfs.tinytrail.dto;


import lombok.Data;

import java.util.Set;

@Data

public class RegisterRequest {
    private String email;

    public RegisterRequest(String email, String password, String username, Set<String> role) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.role = role;
    }

    private String password;
    private String username;
    private Set<String> role;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }

}
