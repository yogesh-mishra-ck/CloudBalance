package com.myBackend.CloudBalance.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserResponseDTO {

    private Long id;
    private String firstName;
    private String message;
    private String email;
}
