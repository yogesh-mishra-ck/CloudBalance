package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.*;
import com.myBackend.CloudBalance.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'READ_ONLY')")
    public ResponseEntity<List<UserResponseDTO>>  getAllUsers(){
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateUserResponseDTO> createUser(@Valid @RequestBody CreateUserRequestDTO createUserRequestDTO){
        CreateUserResponseDTO createUserResponseDTO = userService.createUser(createUserRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createUserResponseDTO);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateUserResponseDTO> updateUser(@Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO, @PathVariable("id") Long userId){
        CreateUserResponseDTO updatedUserResponseDto = userService.updateUser(updateUserRequestDTO, userId);
        return ResponseEntity.ok().body(updatedUserResponseDto);
    }

    @PostMapping("/{id}/account")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CreateAccountResponseDTO> createAccount(@Valid @RequestBody CreateAccountRequestDTO createAccountRequestDTO, @PathVariable("id") Long userId){
        CreateAccountResponseDTO accountResponseDTO = userService.createAccount(createAccountRequestDTO, userId);
        return ResponseEntity.ok().body(accountResponseDTO);
    }

    @GetMapping("/account")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GetAccountsResponseDTO>> getAllAccounts(){
        List<GetAccountsResponseDTO> accountsResponseDTOList = userService.getAllAccounts();
        accountsResponseDTOList.forEach(System.out::println);
        return ResponseEntity.ok().body(accountsResponseDTOList);
    }

    @GetMapping("/{id}/account")
    @PreAuthorize("hasAnyRole('ADMIN', 'CUSTOMER')")
    public ResponseEntity<List<GetAccountsResponseDTO>> getAllAccountsForASpecificUser(@PathVariable Long id){
        List<GetAccountsResponseDTO> accountsResponseDTOS = userService.getAllAccountsForASpecificUser(id);
        return ResponseEntity.ok().body(accountsResponseDTOS);
    }
}
