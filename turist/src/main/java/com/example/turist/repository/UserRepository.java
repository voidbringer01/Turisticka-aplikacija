package com.example.turist.repository;

import com.example.turist.entity.AdminUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<AdminUser,Integer> {
    AdminUser findByUsername(String username);
}
