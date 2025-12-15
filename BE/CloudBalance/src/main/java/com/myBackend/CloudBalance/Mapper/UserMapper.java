package com.myBackend.CloudBalance.Mapper;

import com.myBackend.CloudBalance.dto.UserResponseDTO;
import com.myBackend.CloudBalance.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper{
    UserResponseDTO changeUserToUserResponseDTO(User user);
}
