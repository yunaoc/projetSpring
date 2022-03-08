package com.services;

import com.dtos.ComposanteDto;

import java.util.List;

public interface ComposanteService {
    /**
     * Créer une composante
     */
    ComposanteDto createComposante(ComposanteDto composanteDto);

    /**
     * Retourner une composante
     */
    ComposanteDto getComposanteById(Long composanteId);

    /**
     * Modifier une composante
     */
    ComposanteDto updateComposanteById(Long composanteId, ComposanteDto composanteDto);

    /**
     * Ajoute une filière à une composante
     */
    ComposanteDto addFiliereComposanteById(Long composanteId, Long filiereId);

    /**
     * Supprime un filière d'une composante
     */
    ComposanteDto removeFiliereComposanteById(Long composanteId, Long filiereId);

    /**
     * Ajoute un gestionnaire à un composante
     */
    ComposanteDto addGestionnaireComposanteById(Long composanteId, Long gestionnaireId);

    /**
     * Supprime un gestionnaire d'une composante
     */
    ComposanteDto removeGestionnaireComposanteById(Long composanteId, Long gestionnaireId);

    /**
     * Supprimer un composante
     */
    boolean deleteComposante(Long composanteId);

    /**
     * Retourner tous les composante
     */
    List<ComposanteDto> getAllComposante();
}