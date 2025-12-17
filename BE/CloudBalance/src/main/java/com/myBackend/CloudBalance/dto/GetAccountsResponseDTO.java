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
public class GetAccountsResponseDTO {
    private Long id;
    private String accountName;
    private String accountId;
    private String arnNumber;
}
