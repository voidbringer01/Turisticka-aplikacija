package com.example.turist.repository;

import com.example.turist.entity.Opstina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpstinaRepository extends JpaRepository<Opstina,Integer> {
}
