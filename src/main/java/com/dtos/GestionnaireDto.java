package com.dtos;

import com.entities.Composante;
import lombok.Data;

@Data
public class GestionnaireDto{
    private Long Id;
    private String login;
    private String nomUsuel;
    private String prenom;
    private String motDePasse;
    private String mail;
    private Composante maComposante;
}
