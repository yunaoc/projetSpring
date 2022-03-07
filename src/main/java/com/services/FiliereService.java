package com.services;

import com.dtos.ComposanteDto;
import com.dtos.CoursDto;
import com.dtos.FiliereDto;

import java.util.List;

public interface FiliereService {
    /**
     * Créer une filiere
     */
    FiliereDto createFiliere(FiliereDto filiereDto);

    /**
     * Retourner un filiere
     */
    FiliereDto getFiliereById(Long filiereId);

    /**
     * Modifier un filiere
     */
    FiliereDto updateFiliereById(Long filiereId, FiliereDto filiereDto);

    /**
     * Ajoute un cours à une filiere
     */
    FiliereDto addCoursFiliereById(Long filiereId, Long coursId);

    /**
     * Supprime un cours d'une filiere
     */
    FiliereDto removeCoursFiliereById(Long filiereId, Long coursId);

    /**
     * Supprimer un filiere
     */
    boolean deleteFiliere(Long filiereId);

    /**
     * Retourner tous les filieres
     */
    List<FiliereDto> getAllFilieres();
}
