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
public class Opstina {
    @Id
    @GeneratedValue
    private int id;
    private String nazivOpstine;

    @OneToMany(targetEntity = Znamenitost.class, cascade = CascadeType.ALL)
    @JoinColumn(name="gradznamenitost_fk",referencedColumnName = "id")
    private List<Znamenitost> znamenitosti;
}
