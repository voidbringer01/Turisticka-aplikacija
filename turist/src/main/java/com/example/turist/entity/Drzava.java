package com.example.turist.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Drzava {
    @Id
    @GeneratedValue
    private int id;
    private String nazivDrzave;

    @OneToMany(targetEntity = Opstina.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "drzavagrad_fk", referencedColumnName = "id")
    private List<Opstina> opstine;
}
