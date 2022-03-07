package com.dtos;

import com.entities.Cours;
import lombok.Data;

@Data
public class VacataireDto {
    private Long Id;
    private String login;
    private String nomUsuel;
    private String prenom;
    private String motDePasse;
    private String mail;
    private Cours sonCours;
}
