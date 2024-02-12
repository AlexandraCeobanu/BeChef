package com.licenta.bechefbackend.config;
import com.licenta.bechefbackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final UserService userService;

//    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests((request) -> request.requestMatchers("/api/v1/register/**")
                    .permitAll()
//                    .requestMatchers("/api/v1/admin").hasAnyAuthority(Role.ADMIN.name())
//                    .requestMatchers("/api/v1/users").hasAnyAuthority(Role.USER.name())
//                    .requestMatchers("/api/v1/login").permitAll()
//                    .anyRequest().authenticated()
                            .anyRequest().authenticated()
            )
                .formLogin(Customizer.withDefaults());
//                .formLogin(formLogin -> formLogin
//                .loginPage(Customizer.withDefaults())
//                .permitAll());
//                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//                            .authenticationProvider(authenticationProvider()).addFilterBefore(
//                                    jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class
//                );
            return http.build();
    }
    @Bean
    public AuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;

    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config)
        throws Exception{
        return config.getAuthenticationManager();
    }
}

