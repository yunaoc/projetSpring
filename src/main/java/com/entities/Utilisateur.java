package com.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.Data;

@Entity
@Data
public abstract class Utilisateur {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column(unique=true)
    private String login;
    private String nomUsuel;
    private String prenom;
    private String motDePasse;
    @Column(unique=true)
    private String mail;
}
