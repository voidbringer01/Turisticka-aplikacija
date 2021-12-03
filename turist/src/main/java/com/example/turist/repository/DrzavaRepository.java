package com.example.turist.repository;

import com.example.turist.entity.Drzava;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrzavaRepository extends JpaRepository<Drzava,Integer> {
}
