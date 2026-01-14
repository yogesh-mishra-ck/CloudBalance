package com.myBackend.CloudBalance.exceptions;

public class LoggedInUserNotFoundException extends RuntimeException{
    public LoggedInUserNotFoundException(String message){
        super(message);
    }
}
