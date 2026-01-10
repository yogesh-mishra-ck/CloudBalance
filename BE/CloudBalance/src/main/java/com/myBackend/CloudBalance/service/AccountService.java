package com.myBackend.CloudBalance.service;

import com.myBackend.CloudBalance.dto.AccountMapUserCreate;
import com.myBackend.CloudBalance.dto.CreateAccountRequestDTO;
import com.myBackend.CloudBalance.dto.CreateAccountResponseDTO;
import com.myBackend.CloudBalance.dto.GetAccountsResponseDTO;
import com.myBackend.CloudBalance.entity.User;
import jakarta.validation.Valid;

import java.util.List;

public interface AccountService {
    public CreateAccountResponseDTO createAccount(CreateAccountRequestDTO createAccountRequestDTO, Long userId);
    public List<GetAccountsResponseDTO> getAllAccounts();
    public List<GetAccountsResponseDTO> getAllAccountsForASpecificUser(Long userId);

    public void mapAccountsToThisUser(User user, List<Long> selectedAccounts);
}
