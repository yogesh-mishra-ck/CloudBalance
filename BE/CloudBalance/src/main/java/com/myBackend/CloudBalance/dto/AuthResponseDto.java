package com.myBackend.CloudBalance.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String role;
    private String accessToken;


}
