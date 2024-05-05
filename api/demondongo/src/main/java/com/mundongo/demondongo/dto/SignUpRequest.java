package com.mundongo.demondongo.dto;

public class SignUpRequest {
    private String email;
    private String password;
    private String displayName;

    private Boolean isAdmin = false;

    public SignUpRequest() {
    }

    public SignUpRequest(String email, String password, String displayName, Boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.isAdmin = isAdmin;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getDisplayName() {
        return this.displayName;
    }

    public Boolean getIsAdmin() {
        return this.isAdmin;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDisplayName(String name) {
        this.displayName = name;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

}
