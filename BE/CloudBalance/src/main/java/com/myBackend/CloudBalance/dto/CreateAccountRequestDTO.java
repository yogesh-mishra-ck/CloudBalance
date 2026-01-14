package com.myBackend.CloudBalance.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tools.jackson.databind.annotation.JsonDeserialize;

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