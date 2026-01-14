package com.myBackend.CloudBalance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Around;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class ApiError {
    private int status;
    private String message;
    private LocalDateTime timestamp;
    private Map<String, String> errors = new HashMap<>();

    public ApiError(int status, String message) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
    public ApiError(int status, String message, Map<String, String> errorMap) {
        this.status = status;
        this.message = message;
        this.timestamp = LocalDateTime.now();
        this.errors = errorMap;
    }

}


