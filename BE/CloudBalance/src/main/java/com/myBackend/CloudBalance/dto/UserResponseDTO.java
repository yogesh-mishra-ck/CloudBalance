package com.myBackend.CloudBalance.dto;

import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.mapstruct.Mapper;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private String email;
    private String firstName;
    private String lastName;
    private boolean userActive;
    private Instant lastLogin;
    private Roles role;


}

