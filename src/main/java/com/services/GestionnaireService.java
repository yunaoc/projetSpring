package com.services;

import com.dtos.GestionnaireDto;

import java.util.List;

public interface GestionnaireService {
    /**
     * Créer un gestionnaire
     */
    GestionnaireDto createGestionnaire(GestionnaireDto gestionnaireDto, Long idComposante);

    /**
     * Retourner un gestionnaire
     */
    GestionnaireDto getGestionnaireById(Long gestionnaireId);

    /**
     * Supprimer un gestionnaire
     */
    boolean deleteGestionnaire(Long gestionnaireId);

    /**
     * Modifie un gestionnaire
     */
    GestionnaireDto updateGestionnaire(GestionnaireDto gestionnaireDto, Long gestionnaireId);

    /**
     * Retourner tous les gestionnaire
     */
    List<GestionnaireDto> getAllGestionnaire();
}
