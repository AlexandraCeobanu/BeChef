package com.licenta.bechefbackend;

public class ValidationUtil {
    public static boolean checkEmail(String email)
    {
        return email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
    }
    public static boolean checkPasswords(String password, String repeatedPassword)
    {
        return password.equals(repeatedPassword);
    }
}
