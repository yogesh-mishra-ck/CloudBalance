package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.Mapper.UserMapper;
import com.myBackend.CloudBalance.dto.UserResponseDTO;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserDetailsRepository userDetailsRepository;
    private final UserMapper userMapper;


    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userDetailsRepository.findAll();
        List<UserResponseDTO> usersDTO =
                users.stream().map(userMapper::changeUserToUserResponseDTO)
                        .toList();

        return usersDTO;
    }

    public User getUser(String email){
        User user = userDetailsRepository.findByEmail(email).orElseThrow( () ->new RuntimeException("User not found with this email"));
        return user;
    }
}
