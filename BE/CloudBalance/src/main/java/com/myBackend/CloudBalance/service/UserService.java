package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.Mapper.UserMapper;
import com.myBackend.CloudBalance.dto.*;
import com.myBackend.CloudBalance.entity.Account;
import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.AccountRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserDetailsRepository userDetailsRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;



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

    public CreateUserResponseDTO updateUser(UpdateUserRequestDTO updateUserRequestDTO, Long userId) {
        User userFetchedFromDB = userDetailsRepository.findById(userId).orElseThrow(()-> new RuntimeException("No user found with this id"));
        Roles role = Roles.valueOf(updateUserRequestDTO.getRole().toUpperCase());


        userFetchedFromDB.setFirstName(updateUserRequestDTO.getFirstName());
        userFetchedFromDB.setLastName(updateUserRequestDTO.getLastName());
        userFetchedFromDB.setEmail(updateUserRequestDTO.getEmail());
        userFetchedFromDB.setRole(role);

        userFetchedFromDB = userDetailsRepository.save(userFetchedFromDB);
        return new CreateUserResponseDTO(userFetchedFromDB.getId(), userFetchedFromDB.getFirstName(), userFetchedFromDB.getEmail(), "User updated successfully");
    }

    @Transactional
    public CreateAccountResponseDTO createAccount(@Valid CreateAccountRequestDTO createAccountRequestDTO, Long userId) {

        User user = userDetailsRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found with this id"));
        Account account = Account.builder()
                .accountName(createAccountRequestDTO.getAccountName())
                .accountId(createAccountRequestDTO.getAccountId())
                .arnNumber(createAccountRequestDTO.getArnNumber())
                .build();


        accountRepository.save(account);
        user.addAccount(account);
        userDetailsRepository.save(user);


        return new CreateAccountResponseDTO(account.getId(), account.getAccountName());
    }


    public List<GetAccountsResponseDTO> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
//        accounts.forEach(System.out::println);
        List<GetAccountsResponseDTO> accountsResponseDTOList =
                accounts.stream()
                        .map(account ->
                                new GetAccountsResponseDTO(
                                        account.getId(),
                                        account.getAccountName(),
                                        account.getAccountId(),
                                        account.getArnNumber()
                                )
                        )
                        .toList();

//        accountsResponseDTOList.forEach(System.out::println);
        return accountsResponseDTOList;
    }

    public List<GetAccountsResponseDTO> getAllAccountsForASpecificUser(Long userId) {
        User user = userDetailsRepository.findById(userId).orElseThrow(()-> new RuntimeException());
        System.out.println(user.getAccounts());

        List<Account> accounts = userDetailsRepository.findAccountByUserId(userId);
        return accounts.stream().map(account -> new GetAccountsResponseDTO(account.getId(),
                account.getAccountName(),
                account.getAccountId(),
                account.getArnNumber()))
                .toList();
    }


}
