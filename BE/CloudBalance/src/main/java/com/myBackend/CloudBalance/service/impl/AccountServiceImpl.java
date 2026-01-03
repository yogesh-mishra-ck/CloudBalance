package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.dto.CreateAccountRequestDTO;
import com.myBackend.CloudBalance.dto.CreateAccountResponseDTO;
import com.myBackend.CloudBalance.dto.GetAccountsResponseDTO;
import com.myBackend.CloudBalance.entity.Account;
import com.myBackend.CloudBalance.entity.Roles;
import com.myBackend.CloudBalance.entity.User;
import com.myBackend.CloudBalance.repository.AccountRepository;
import com.myBackend.CloudBalance.repository.UserDetailsRepository;
import com.myBackend.CloudBalance.service.AccountService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final UserDetailsRepository userDetailsRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public CreateAccountResponseDTO createAccount(CreateAccountRequestDTO createAccountRequestDTO, Long userId) {

//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        User userAuth = (User) auth.getPrincipal();
//        Long id = userAuth.getId();
//        Roles roles = userAuth.getRole();

        //
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
