package com.licenta.bechefbackend;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserServiceInterface {
    UserDetailsService userDetailsService();
}
