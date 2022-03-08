package com.entities;

import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Filiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFiliere;
    private String codeFiliere;
    private String nomFiliere;
    @ManyToMany
    private List<Cours> lesCours;

    public void addCours(Cours cours) {
        this.lesCours.add(cours);
    }

    public void removeFiliere(Cours cours) {
        this.lesCours.remove(cours);
    }
}
