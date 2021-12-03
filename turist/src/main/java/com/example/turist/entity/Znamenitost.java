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
public class Znamenitost {
    @Id
    @GeneratedValue
    private int id;
    private String naziv;
    private String opis;
    private boolean aktivna;
    @ElementCollection
    @CollectionTable(name="slike",joinColumns = @JoinColumn(name="id"))
    @Column(name="slike")
    private List<String> slike;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="znamenitostkoordinate_fk", referencedColumnName = "id")
    private Koordinate koordinate;

    private Vaznost vaznost;

    @OneToMany(targetEntity = Ocena.class, cascade = CascadeType.ALL)
    @JoinColumn(name="znamenitostocena_fk",referencedColumnName = "id")
    private List<Ocena> ocene;

}
