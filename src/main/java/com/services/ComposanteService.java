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
     * Supprimer un composante
     */
    boolean deleteComposante(Long composanteId);

    /**
     * Retourner tous les composante
     */
    List<ComposanteDto> getAllComposante();
}