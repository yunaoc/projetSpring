package com.services.impl;

import com.dtos.UtilisateurDto;
import com.entities.Utilisateur;
import com.repositories.UtilisateurRepository;
import com.services.UtilisateurService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("utilisateurService")
public class UtilisateurServiceImpl implements UtilisateurService {
    private final UtilisateurRepository utilisateurRepository;

    public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Override
    public UtilisateurDto getUtilisateur(String utilisateurLogin, String mdp) {
        Utilisateur utilisateur = utilisateurRepository.findByLoginAndMotDePasse(utilisateurLogin, mdp);
        return utilisateurEntityToDto(utilisateur);
    }


    @Override
    public List<UtilisateurDto> getAllUtilisateurs() {
        List<UtilisateurDto> utilisateurDtos = new ArrayList<>();
        List<Utilisateur> utilisateurs = utilisateurRepository.findAll();
        utilisateurs.forEach(utilisateur -> {
            utilisateurDtos.add(utilisateurEntityToDto(utilisateur));
        });
        return utilisateurDtos;
    }

    /**
     * Map utilisateur dto to utilisateur entity
     */
    private UtilisateurDto utilisateurEntityToDto(Utilisateur utilisateur) {
        UtilisateurDto utilisateurDto = new UtilisateurDto();
        utilisateurDto.setId(utilisateur.getId());
        utilisateurDto.setLogin(utilisateur.getLogin());
        utilisateurDto.setNomUsuel(utilisateur.getNomUsuel());
        utilisateurDto.setPrenom(utilisateur.getPrenom());
        utilisateurDto.setMotDePasse(utilisateur.getMotDePasse());
        utilisateurDto.setMail(utilisateur.getMail());
        return utilisateurDto;
    }
}
