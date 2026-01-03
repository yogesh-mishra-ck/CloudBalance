package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.CreateAccountRequestDTO;
import com.myBackend.CloudBalance.dto.CreateAccountResponseDTO;
import com.myBackend.CloudBalance.dto.GetAccountsResponseDTO;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;


    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    @PostMapping("/me/account")
    public ResponseEntity<CreateAccountResponseDTO> createAccount(@Valid @RequestBody CreateAccountRequestDTO createAccountRequestDTO,Authentication authentication){

        User user = (User) authentication.getPrincipal();

        CreateAccountResponseDTO accountResponseDTO = accountService.createAccount(createAccountRequestDTO, user.getId());
        return ResponseEntity.ok().body(accountResponseDTO);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/account")
    public ResponseEntity<List<GetAccountsResponseDTO>> getAllAccounts(){
        List<GetAccountsResponseDTO> accountsResponseDTOList = accountService.getAllAccounts();
        accountsResponseDTOList.forEach(System.out::println);
        return ResponseEntity.ok().body(accountsResponseDTOList);
    }


    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    @GetMapping("/me/account")
    public ResponseEntity<List<GetAccountsResponseDTO>> getMyAccounts(Authentication authentication){

        User user = (User) authentication.getPrincipal();

        List<GetAccountsResponseDTO> accountsResponseDTOS = accountService.getAllAccountsForASpecificUser(user.getId());
        return ResponseEntity.ok().body(accountsResponseDTOS);
    }
}
