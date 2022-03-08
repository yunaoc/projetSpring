package com.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Data;

@Entity
@Data
public class Cours {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String intitule;

    @OneToMany
    private List<Filiere> lesFilieres;

    @OneToMany
    private List<Vacataire> lesVacataires;

    public Cours() {
        this.lesFilieres = new ArrayList<>();
        this.lesVacataires = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long idCours) {
        this.id = idCours;
    }

    public String getIntitule() {
        return intitule;
    }

    public void setIntitule(String intitule) {
        this.intitule = intitule;
    }

    public List<Filiere> getLesFilieres() {
        return lesFilieres;
    }

    public void setLesFilieres(List<Filiere> lesFilieres) {
        this.lesFilieres = lesFilieres;
    }

    public void addFiliere(Filiere filiere) {
        this.lesFilieres.add(filiere);
    }

    public void removeFiliere(Filiere filiere) {
        this.lesFilieres.remove(filiere);
    }

    public List<Vacataire> getLesVacataires() {
        return lesVacataires;
    }

    public void setLesVacataires(List<Vacataire> lesVacataires) {
        this.lesVacataires = lesVacataires;
    }

    public void addVacataire(Vacataire vacataire) {
        this.lesVacataires.add(vacataire);
    }

    public void removeVacataire(Vacataire vacataire) {
        this.lesVacataires.remove(vacataire);
    }
}