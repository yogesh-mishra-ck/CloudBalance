package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.dto.CreateAccountRequestDTO;
import com.myBackend.CloudBalance.dto.CreateAccountResponseDTO;
import com.myBackend.CloudBalance.dto.GetAccountsResponseDTO;

import java.util.List;

public interface AccountService {
    public CreateAccountResponseDTO createAccount(CreateAccountRequestDTO createAccountRequestDTO, Long userId);
    public List<GetAccountsResponseDTO> getAllAccounts();
    public List<GetAccountsResponseDTO> getAllAccountsForASpecificUser(Long userId);
}
