package com.myBackend.CloudBalance.controller;

import com.myBackend.CloudBalance.dto.*;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.service.AccountService;
import com.myBackend.CloudBalance.service.impl.UserServiceImpl;
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

    private final UserServiceImpl userService;
    private final AccountService accountService;

    @PreAuthorize("hasAnyRole('READ_ONLY', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>>  getAllUsers(){
        List<UserResponseDTO> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

//    @PreAuthorize("hasRole('ADMIN')")
//    @PostMapping
//    public ResponseEntity<CreateUserResponseDTO> createUser(@Valid @RequestBody CreateUserRequestDTO createUserRequestDTO){
//        System.out.println(createUserRequestDTO);
//        CreateUserResponseDTO createUserResponseDTO = userService.createUser(createUserRequestDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createUserResponseDTO);
//    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CreateUserResponseDTO> updateUser(@Valid @RequestBody UpdateUserRequestDTO updateUserRequestDTO, @PathVariable("id") Long userId){
        CreateUserResponseDTO updatedUserResponseDto = userService.updateUser(updateUserRequestDTO, userId);
        return ResponseEntity.ok().body(updatedUserResponseDto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody AccountMapUserCreate accountMapUserCreate  ){
        System.out.println(accountMapUserCreate);
        User user = userService.createUserOnboardAccount(accountMapUserCreate); //except selected accounts
//        accountService.mapAccountsToThisUser(accountMapUserCreate);
        return ResponseEntity.ok(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/change-status")
    public ResponseEntity<UserResponseDTO> changeActiveStatus(@PathVariable Long id){
        System.out.println("Reached in active");
        UserResponseDTO updatedUser = userService.changeActiveStatus(id);
        return ResponseEntity.ok().body(updatedUser);
    }

}
