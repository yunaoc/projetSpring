package com.services.impl;

import com.dtos.GestionnaireDto;
import com.entities.Composante;
import com.entities.Gestionnaire;
import com.repositories.ComposanteRepository;
import com.repositories.GestionnaireRepository;
import com.services.GestionnaireService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("GestionnaireService")
public class GestionnaireServiceImpl implements GestionnaireService {
    private final GestionnaireRepository gestionnaireRepository;
    private final ComposanteRepository composanteRepository;

    public GestionnaireServiceImpl(GestionnaireRepository gestionnaireRepository, ComposanteRepository composanteRepository) {
        this.gestionnaireRepository = gestionnaireRepository;
        this.composanteRepository = composanteRepository;
    }


    @Override
    public GestionnaireDto createGestionnaire(GestionnaireDto gestionnaireDto, Long idComposante) {
        Composante composante = composanteRepository.findById(idComposante).orElseThrow(() -> new EntityNotFoundException("Composante not found"));
        gestionnaireDto.setMaComposante(composante);
        Gestionnaire gestionnaire = gestionnaireDtoToEntity(gestionnaireDto);
        gestionnaire = gestionnaireRepository.save(gestionnaire);
        return gestionnaireEntityToDto(gestionnaire);
    }

    @Override
    public GestionnaireDto getGestionnaireById(Long gestionnaireId) {
        Gestionnaire gestionnaire = gestionnaireRepository.findById(gestionnaireId).orElseThrow(() -> new EntityNotFoundException("Gestionnaire not found"));
        return gestionnaireEntityToDto(gestionnaire);
    }

    @Override
    public boolean deleteGestionnaire(Long gestionnaireId) {
        gestionnaireRepository.deleteById(gestionnaireId);
        return true;
    }

    @Override
    public GestionnaireDto updateGestionnaire(GestionnaireDto gestionnaireDto, Long gestionnaireId) {
        Gestionnaire gestionnaire = gestionnaireRepository.findById(gestionnaireId).orElseThrow(() -> new EntityNotFoundException("Gestionnaire not found"));

        if(gestionnaireDto.getNomUsuel() != null )
            gestionnaire.setNomUsuel(gestionnaireDto.getNomUsuel());

        if(gestionnaireDto.getPrenom() != null )
            gestionnaire.setPrenom(gestionnaireDto.getPrenom());

        if(gestionnaireDto.getMotDePasse() != null )
            gestionnaire.setMotDePasse(gestionnaireDto.getMotDePasse());

        if(gestionnaireDto.getMail() != null )
            gestionnaire.setMail(gestionnaireDto.getMail());

        gestionnaire = gestionnaireRepository.save(gestionnaire);
        return gestionnaireEntityToDto(gestionnaire);
    }

    @Override
    public List<GestionnaireDto> getAllGestionnaire() {
        List<GestionnaireDto> gestionnaireDto = new ArrayList<>();
        List<Gestionnaire> gestionnaire = gestionnaireRepository.findAll();
        gestionnaire.forEach(vacataire -> {
            gestionnaireDto.add(gestionnaireEntityToDto(vacataire));
        });
        return gestionnaireDto;
    }

    /**
     * Map gestionnaire dto to gestionnaire entity
     */
    private GestionnaireDto gestionnaireEntityToDto(Gestionnaire gestionnaire){
        GestionnaireDto gestionnaireDto = new GestionnaireDto();
        gestionnaireDto.setId(gestionnaire.getId());
        gestionnaireDto.setLogin(gestionnaire.getLogin());
        gestionnaireDto.setNomUsuel(gestionnaire.getNomUsuel());
        gestionnaireDto.setPrenom(gestionnaire.getPrenom());
        gestionnaireDto.setMotDePasse(gestionnaire.getMotDePasse());
        gestionnaireDto.setMail(gestionnaire.getMail());
        gestionnaireDto.setMaComposante(gestionnaire.getMaComposante());
        return gestionnaireDto;
    }

    /**
     * Map gestionnaire entity to gestionnaire dto
     */
    private Gestionnaire gestionnaireDtoToEntity(GestionnaireDto gestionnaireDto){
        Gestionnaire gestionnaire = new Gestionnaire();
        gestionnaire.setLogin(gestionnaireDto.getLogin());
        gestionnaire.setNomUsuel(gestionnaireDto.getNomUsuel());
        gestionnaire.setId(gestionnaireDto.getId());
        gestionnaire.setPrenom(gestionnaireDto.getPrenom());
        gestionnaire.setMotDePasse(gestionnaireDto.getMotDePasse());
        gestionnaire.setMail(gestionnaireDto.getMail());
        gestionnaire.setMaComposante(gestionnaireDto.getMaComposante());
        return gestionnaire;
    }

}
