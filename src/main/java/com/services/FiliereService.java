package com.services;

import com.dtos.ComposanteDto;
import com.dtos.CoursDto;
import com.dtos.FiliereDto;

import java.util.List;

public interface FiliereService {
    /**
     * Créer une filiere
     */
    FiliereDto createFiliere(FiliereDto filiereDto, Long idComposante);

    /**
     * Retourner un filiere
     */
    FiliereDto getFiliereById(Long filiereId);

    /**
     * Modifier un filiere
     */
    FiliereDto updateFiliereById(Long filiereId, FiliereDto filiereDto);

    /**
     * Supprimer un filiere
     */
    boolean deleteFiliere(Long filiereId);

    /**
     * Retourner tous les filieres
     */
    List<FiliereDto> getAllFilieres();
}
