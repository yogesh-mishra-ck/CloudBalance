package com.myBackend.CloudBalance.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountRequestDTO {

    @NotBlank(message = "Account Name is required")
    private String accountName;

    @NotBlank(message = "Account ID is required")
    private String accountId;

    @NotBlank(message = "ARN Number is required")
    private String arnNumber;
}
