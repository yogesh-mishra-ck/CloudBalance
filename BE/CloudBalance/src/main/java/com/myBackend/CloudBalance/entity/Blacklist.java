package com.myBackend.CloudBalance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Blacklist {

    @Id
    private String tokenId;
    private boolean blacklisted;

    public Blacklist(String token, boolean blacklisted) {
        this.tokenId = token;
        this.blacklisted = blacklisted;
    }
}
