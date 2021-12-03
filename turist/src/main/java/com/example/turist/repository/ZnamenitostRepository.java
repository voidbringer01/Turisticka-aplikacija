package com.example.turist.repository;

import com.example.turist.entity.Znamenitost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ZnamenitostRepository extends JpaRepository<Znamenitost,Integer>, JpaSpecificationExecutor<Znamenitost> {
    @Query(value="Select avg(o.ocena) from znamenitost z,ocena o where z.id= ?#{[0]} and z.id =o.znamenitostocena_fk", nativeQuery = true)
    public Integer findAverageOcena(int id);
}
