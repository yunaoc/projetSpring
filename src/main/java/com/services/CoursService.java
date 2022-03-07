package com.services;

import com.dtos.CoursDto;
import com.dtos.VacataireDto;

import java.util.List;

public interface CoursService {
    /**
     * Créer un cours
     */
    CoursDto createCours(CoursDto coursDto);

    /**
     * Retourner un cours
     */
    CoursDto getCoursById(Long coursId);

    /**
     * Modifier un cours
     */
    CoursDto updateCoursById(Long coursId, CoursDto coursDto);

    /**
     * Ajoute un vacataire à un cours
     */
    CoursDto addVacataireCoursById(Long coursId, Long vacataireId);

    /**
     * Supprime un vacataire d'un cours
     */
    CoursDto removeVacataireCoursById(Long coursId, Long vacataireId);

    /**
     * Ajoute une filière à un cours
     */
    CoursDto addFiliereCoursById(Long coursId, Long filiereId);

    /**
     * Supprime une filière d'un cours
     */
    CoursDto removeFiliereCoursById(Long coursId, Long filiereId);

    /**
     * Supprimer un cours
     */
    boolean deleteCours(Long coursId);

    /**
     * Retourner tous les cours
     */
    List<CoursDto> getAllCours();
}

