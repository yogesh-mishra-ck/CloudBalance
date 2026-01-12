package com.myBackend.CloudBalance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoggedInUserDTO {

    private String firstName;
    private String lastName;
    private String role;
    private Long id;
}
