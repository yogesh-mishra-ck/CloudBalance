package com.myBackend.CloudBalance.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import net.snowflake.client.jdbc.internal.org.checkerframework.checker.units.qual.C;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
//@ToString
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Account Name is required")
    @Column(nullable = false)
    private String accountName;

    @NotBlank(message = "Account ID is required")
    @Column(nullable = false,unique = true)
    private String accountId;

    @NotBlank(message = "ARN Number is required")
    @Column(nullable = false)
    private String arnNumber;

    //inverse side
    @ManyToMany(mappedBy = "accounts")
    @Builder.Default
    @JsonIgnore
    private Set<User> users = new HashSet<>();
}
