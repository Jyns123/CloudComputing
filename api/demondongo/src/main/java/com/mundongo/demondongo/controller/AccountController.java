package com.mundongo.demondongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mundongo.demondongo.model.Account;
import com.mundongo.demondongo.service.AccountService;

import java.util.List;

@RestController
@RequestMapping("api/account")
public class AccountController {
    @Autowired
    private AccountService serv;

    @GetMapping
    public ResponseEntity<List<Account>> getAllAccounts() {
        return serv.read();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable Long id) {
        return serv.readSpecific(id);
    }

    @PostMapping
    public ResponseEntity<String> createAccount(@RequestBody Account account) {
        return serv.create(account);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateAccount(@RequestBody Account account, @PathVariable Long id) {
        return serv.update(account, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        return serv.delete(id);
    }
}
