package com.myBackend.CloudBalance.repository;

import com.myBackend.CloudBalance.entity.Account;
import com.myBackend.CloudBalance.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT a FROM User u JOIN u.accounts a  WHERE u.id = ?1")
    List<Account> findAccountByUserId(Long userId);

        //    SELECT a FROM Account a
        //    WHERE a.user.id = :userId;

        //better performance than user.getAll() because user.getAll uses join
}
