package com.licenta.bechefbackend;

import com.licenta.bechefbackend.services.UserService;
import org.apache.commons.validator.routines.EmailValidator;

public class ValidationUtil {
    public static boolean checkEmail(String email)
    {
        return EmailValidator.getInstance().isValid(email);
    }
    public static boolean isEmailUsed(String email, UserService userService)
    {
        if(userService.findUserByEmail(email) == null)
            return false;
        return true;
    }
    public static boolean checkPasswords(String password, String repeatedPassword)
    {
        return password.equals(repeatedPassword);
    }
    public static String checkPassword(String password)
    {
        if(password.length() < 8)
            return "The password must contain at least 8 characters";
        if(password.length() > 20)
            return "The password must be less than 20 characters";
        if(!password.matches(".*[A-Z].*"))
            return "The password must contain at least 1 uppercase character";
        if(!password.matches(".*[a-z].*"))
            return "The password must contain at least 1 lowercase character";
        if(!password.matches(".*[0-9].*"))
            return "The password must contain at least 1 digit";
        if(!password.matches(".*[@#$%&-+=()].*"))
            return "The password must contain at least 1 special character";

        return "";
    }
}
