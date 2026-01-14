package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.CreateAccountRequestDTO;
import com.myBackend.CloudBalance.dto.CreateAccountResponseDTO;
import com.myBackend.CloudBalance.dto.GetAccountsResponseDTO;
import com.myBackend.CloudBalance.entity.CustomUserDetails;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/me/account")
    public ResponseEntity<CreateAccountResponseDTO> createAccount(@Valid @RequestBody CreateAccountRequestDTO createAccountRequestDTO,Authentication authentication){


        System.out.println(createAccountRequestDTO.getAccountId());
        System.out.println(createAccountRequestDTO.getAccountName());
        System.out.println(createAccountRequestDTO.getArnNumber());

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        CreateAccountResponseDTO accountResponseDTO = accountService.createAccount(createAccountRequestDTO, userDetails.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(accountResponseDTO);
    }


    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    @GetMapping("/admin/account")
    public ResponseEntity<List<GetAccountsResponseDTO>> getAllAccounts(){
        System.out.println("Hello all accounts before") ;
        List<GetAccountsResponseDTO> accountsResponseDTOList = accountService.getAllAccounts();
//        accountsResponseDTOList.forEach(System.out::println);
        System.out.println("Hello all accounts after") ;

        return ResponseEntity.ok().body(accountsResponseDTOList);
    }


    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN','READ_ONLY')")
    @GetMapping("/me/account")
    public ResponseEntity<List<GetAccountsResponseDTO>> getMyAccounts(Authentication authentication){

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        System.out.println("ID is "+userDetails.getUserId());
        List<GetAccountsResponseDTO> accountsResponseDTOS = accountService.getAllAccountsForASpecificUser(userDetails.getUserId());
        return ResponseEntity.ok().body(accountsResponseDTOS);
    }

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER','READ_ONLY')")
    @GetMapping("/account/{id}")
    public ResponseEntity<List<GetAccountsResponseDTO>> getAccountsForUser(@PathVariable Long id){
        List<GetAccountsResponseDTO> accountsResponseDTOS = accountService.getAllAccountsForASpecificUser(id);
        return ResponseEntity.ok().body(accountsResponseDTOS);
    }
}
