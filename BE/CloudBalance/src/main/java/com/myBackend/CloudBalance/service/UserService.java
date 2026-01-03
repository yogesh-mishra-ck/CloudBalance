package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.dto.*;
import com.myBackend.CloudBalance.entity.User;

import java.util.List;

public interface UserService {
    public List<UserResponseDTO> getAllUsers();
    public User getUser(String email);
    public CreateUserResponseDTO createUser(CreateUserRequestDTO createUserRequestDTO);
    public CreateUserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO, Long userId);
}