package com.licenta.bechefbackend.registration.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    private final ConfirmationTokenRepository confirmationTokenRepository;
    public void saveConfirmationToken(ConfirmationToken token)
    {
        confirmationTokenRepository.save(token);
    }
    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }
    public Optional<ConfirmationToken> getRegistrationTokenByUser(Long id) {return confirmationTokenRepository.findRegistrationByUserId(id);}

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }

    public void deleteAllByUserId(Long id) {
       int del =  confirmationTokenRepository.deleteAllByUserId(id);
    }
}
