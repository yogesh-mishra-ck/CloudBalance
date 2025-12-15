package com.myBackend.CloudBalance.exceptions;

import com.myBackend.CloudBalance.dto.ApiError;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiError> handleLoginValidation(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, "Username or password missing"));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError(401, "Invalid username or password"));
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiError> handleUserNotActive(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiError(403, "User account has been disabled"));
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiError> handleAccessDenied(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiError(403, "You do not have sufficient permission to access this resource"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralException(){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiError(500, "INTERNAL SERVER ERROR!! Something went wrong"));
    }
}
