package com.myBackend.CloudBalance.exceptions;

public class InvalidRefreshTokenException  extends RuntimeException{
    public InvalidRefreshTokenException(String message){
        super(message);
    }
}
