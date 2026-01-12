package com.myBackend.CloudBalance.service.impl;

//import com.myBackend.CloudBalance.Mapper.UserMapper;
import com.myBackend.CloudBalance.dto.*;
import com.myBackend.CloudBalance.entity.Account;
import com.myBackend.CloudBalance.entity.CustomUserDetails;
import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.AccountRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import com.myBackend.CloudBalance.service.AccountService;
import com.myBackend.CloudBalance.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDetailsRepository userDetailsRepository;
//    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final AccountService accountService;



    public List<UserResponseDTO> getAllUsers() {
        List<User> users = userDetailsRepository.findAll();
        List<UserResponseDTO> usersDTO =
                users.stream().map(currentUser -> new UserResponseDTO(currentUser.getId(), currentUser.getEmail(), currentUser.getFirstName(),currentUser.getLastName(), currentUser.isUserActive(), currentUser.getLastLogin(),currentUser.getRole()))
                        .toList();

        return usersDTO;
    }

    public User getUser(String email){
        User user = userDetailsRepository.findByEmail(email).orElseThrow( () ->new RuntimeException("User not found with this email"));
        return user;
    }

    public CreateUserResponseDTO createUser(CreateUserRequestDTO createUserRequestDTO) {

        Roles role = Roles.valueOf(createUserRequestDTO.getRole().toUpperCase());
        User user = User.builder()
                .firstName(createUserRequestDTO.getFirstName())
                .lastName(createUserRequestDTO.getLastName())
                .email(createUserRequestDTO.getEmail())
                .userActive(true)
                .lastLogin(Instant.now())
                .password(passwordEncoder.encode(createUserRequestDTO.getPassword()))
                .role(role)
                .build();


        user = userDetailsRepository.save(user);
        System.out.println();

        return new CreateUserResponseDTO(user.getId(), user.getFirstName(), user.getEmail(), "User created successfully");
    }

    @Transactional
    public CreateUserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO, Long userId) {
//        User userFetchedFromDB = userDetailsRepository.findById(userId).orElseThrow(()-> new RuntimeException("No user found with this id"));
//        Roles role = Roles.valueOf(updateUserRequestDTO.getRole().toUpperCase());
//
//
//        userFetchedFromDB.setFirstName(updateUserRequestDTO.getFirstName());
//        userFetchedFromDB.setLastName(updateUserRequestDTO.getLastName());
//        userFetchedFromDB.setEmail(updateUserRequestDTO.getEmail());
//        userFetchedFromDB.setRole(role);
//
//        userFetchedFromDB = userDetailsRepository.save(userFetchedFromDB);
//        return new CreateUserResponseDTO(userFetchedFromDB.getId(), userFetchedFromDB.getFirstName(), userFetchedFromDB.getEmail(), "User updated successfully");

        User userFetchedFromDB = userDetailsRepository.findById(userId).orElseThrow(()-> new UsernameNotFoundException("No user found with this id"));
        Roles role = Roles.valueOf(updateUserRequestDTO.getRole().toUpperCase());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedInUser = userDetailsRepository.findByEmail(authentication.getName()).orElseThrow(()-> new RuntimeException("Can't find logged in user's entity"));

        if(loggedInUser == null)
            throw new RuntimeException("User not set in context");

        //editing myself
        if(loggedInUser.getId().equals(userId)){
            userFetchedFromDB.setFirstName(updateUserRequestDTO.getFirstName());
            userFetchedFromDB.setLastName(updateUserRequestDTO.getLastName());
        }

        //editing others who are not admin
        else if( (loggedInUser.getRole().equals(Roles.ADMIN) && userFetchedFromDB.getRole() != Roles.ADMIN) ){
            userFetchedFromDB.setFirstName(updateUserRequestDTO.getFirstName());
            userFetchedFromDB.setLastName(updateUserRequestDTO.getLastName());
            userFetchedFromDB.setEmail(updateUserRequestDTO.getEmail());
            userFetchedFromDB.setRole(role);
        }

        accountService.mapAccountsToThisUser(userFetchedFromDB, updateUserRequestDTO.getSelectedAccounts());

        return new CreateUserResponseDTO(userFetchedFromDB.getId(), userFetchedFromDB.getFirstName(), userFetchedFromDB.getEmail(), "User updated successfully");
    }



    @Transactional
    public User createUserOnboardAccount(AccountMapUserCreate accountMapUserCreate) {

        Roles role = Roles.valueOf(accountMapUserCreate.getRole().toUpperCase());
        User user = User.builder()
                .firstName(accountMapUserCreate.getFirstName())
                .lastName(accountMapUserCreate.getLastName())
                .email(accountMapUserCreate.getEmail())
                .userActive(true)
                .lastLogin(Instant.now())
                .password(passwordEncoder.encode(accountMapUserCreate.getPassword()))
                .role(role)
                .build();


        user = userDetailsRepository.save(user);
        System.out.println();
//        if( (!accountMapUserCreate.getRole().equals(Roles.CUSTOMER.name())) ||  accountMapUserCreate.getSelectedAccounts().isEmpty())
//            return user;

        accountService.mapAccountsToThisUser(user, accountMapUserCreate.getSelectedAccounts());

        return user;
    }

    @Override
    public UserResponseDTO changeActiveStatus(Long id){
        User user = userDetailsRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with this id"));
        user.setUserActive(!user.isUserActive());
        userDetailsRepository.save(user);
        return new UserResponseDTO(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.isUserActive(), user.getLastLogin(), user.getRole());
    }

    @Override
    public LoggedInUserDTO getLoggedInUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || !authentication.isAuthenticated())
            throw new UsernameNotFoundException("User not in session");


        CustomUserDetails customUserDetails = (CustomUserDetails)authentication.getPrincipal();
        String username = customUserDetails.getUsername();

        User user = userDetailsRepository.findByEmail(username).orElseThrow(()-> new RuntimeException("User not found in db"));
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        String role = user.getRole().toString();
        Long id = user.getId();
        return new LoggedInUserDTO(firstName,lastName,role,id);
    }
}
