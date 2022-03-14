package com.services;

import com.dtos.UtilisateurDto;

import java.util.List;

public interface UtilisateurService {

    /**
     * Retourner un vacataire
     */
    UtilisateurDto getUtilisateur(String utilisateurLogin, String mdp);

    /**
     * Retourner tous les vacataires
     */
    List<UtilisateurDto> getAllUtilisateurs();
}
