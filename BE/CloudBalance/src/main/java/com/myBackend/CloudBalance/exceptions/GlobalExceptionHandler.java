package com.myBackend.CloudBalance.exceptions;

import com.myBackend.CloudBalance.dto.ApiError;
import jakarta.validation.Validation;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiError> handleLoginValidation(ValidationException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, ex.getMessage()));
    }
//    @ExceptionHandler(HttpMessageNotReadableException.class)
//    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(HttpMessageNotReadableException ex){
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, "Invalid data type!"));
//    }

    //login with wrong password
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiError> handleBadCredentials(BadCredentialsException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError(401, "Invalid username or password"));
    }

    //when /user/me is called without token
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiError> handleInvalidTokenException(InvalidTokenException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError(401, ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
        Map<String, String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, "Validation Failed!",errorMap));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleIllegalAccessError(IllegalArgumentException ex){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(401, ex.getMessage()));
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiError> handleUserNotActive(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiError(403, "User account has been disabled"));
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<ApiError> handleAuthorizationDeniedException(){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiError(403, "You dont have sufficient permissions to perform this operation"));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ApiError> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex){
        String message = "Method "+ex.getMethod()+" not allowed for this endpoint. Supported methods are "+ Arrays.toString(ex.getSupportedMethods()) ;
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ApiError(405, "No Api call is registered with this endpoint and method"));
    }

    @ExceptionHandler(NoResourceFoundException.class)
    public ResponseEntity<ApiError> handleNoResourceFound(NoResourceFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiError(404, "Endpoint not found: " + ex.getResourcePath()));
    }

    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<ApiError> handleMethodArgumentNotValidException(MissingPathVariableException ex){
        String message = "Path variable "+ex.getVariableName()+" is missing";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, message));
    }



    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiError> handleHttpMessageNotReadableException(){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, "Invalid input format!"));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiError> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex){
        String type = ex.getRequiredType()!=null ? ex.getRequiredType().getSimpleName() : "Unknown type ";
        String message = "Path variable "+ex.getName()+" has invalid value. Expected Type: "+type;
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, message));
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public ResponseEntity<ApiError> handleMissingRequestCookieException(MissingRequestCookieException ex){
        String cookieName = ex.getCookieName();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError(400, "Required Cookie "+ cookieName +" not found!"));
    }


    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<?> handleInvalidRefreshToken(InvalidRefreshTokenException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiError(403, ex.getMessage()));

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralException(Exception e){
        System.out.println("THE EXCEPTION IS THIS"+e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiError(500, " Something went wrong "+e.getMessage()));
    }
}
