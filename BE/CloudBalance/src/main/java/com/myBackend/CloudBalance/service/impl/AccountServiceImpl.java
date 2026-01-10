package com.myBackend.CloudBalance.service.impl;

import com.myBackend.CloudBalance.dto.AccountMapUserCreate;
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
//        User user = userDetailsRepository.findById(userId).orElseThrow(()-> new RuntimeException("Logged in user is not valid"));
//        System.out.println(user.getAccounts());

        List<Account> accounts = userDetailsRepository.findAccountByUserId(userId);
        return accounts.stream().map(account -> new GetAccountsResponseDTO(account.getId(),
                        account.getAccountName(),
                        account.getAccountId(),
                        account.getArnNumber()))
                .toList();
    }

    @Override
    @Transactional
    public void mapAccountsToThisUser(User newUser, List<Long> ids) {
//        List<Long> ids = accountMapUserCreate.getSelectedAccounts();
        System.out.println("Hi");
        List<Account> retrievedAccounts = accountRepository.findByIdIn(ids);

        if (retrievedAccounts.isEmpty()) {
            throw new RuntimeException("No accounts found for given IDs");
        }

        System.out.println(ids);
        System.out.println(retrievedAccounts);
        for(Account ac: retrievedAccounts){
            ac.getUsers().add(newUser);
//            newUser.getAccounts().add(ac);
        }

        newUser.getAccounts().clear();
        newUser.getAccounts().addAll(retrievedAccounts);


        System.out.println(newUser);

        userDetailsRepository.save(newUser);

    }
}
