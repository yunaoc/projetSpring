package com.services;


import com.dtos.VacataireDto;

import java.util.List;
public interface VacataireService {
    /**
     * Créer un vacataire
     */
    VacataireDto createVacataire(VacataireDto vacataireDto);

    /**
     * Retourner un vacataire
     */
    VacataireDto getVacataireById(Long vacataireId);

    /**
     * Supprimer un vacataire
     */
    boolean deleteVacataire(Long vacataireId);

    /**
     * Retourner tous les vacataires
     */
    List<VacataireDto> getAllVacataires();
}
