package com.entities;

import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Cours {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCours;
    private String intitule;

    @OneToMany
    private List<Vacataire> lesVacataires;
}