package com.services.impl;

import com.dtos.VacataireDto;
import com.entities.Cours;
import com.entities.Vacataire;
import com.repositories.VacataireRepository;
import com.services.VacataireService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("vacataireService")
public class VacataireServiceImpl implements VacataireService {
    private final VacataireRepository vacataireRepository;

    public VacataireServiceImpl(VacataireRepository vacataireRepository){
        this.vacataireRepository = vacataireRepository;
    }

    @Override
    public VacataireDto createVacataire(VacataireDto vacataireDto) {
        Vacataire vacataire = vacataireDtoToEntity(vacataireDto);
        vacataire = vacataireRepository.save(vacataire);
        return vacataireEntityToDto(vacataire);
    }

    @Override
    public VacataireDto getVacataireById(Long vacataireId) {
        Vacataire vacataire = vacataireRepository.findById(vacataireId).orElseThrow(() -> new EntityNotFoundException("Vacataire not found"));
        return vacataireEntityToDto(vacataire);
    }

    @Override
    public boolean deleteVacataire(Long vacataireId) {
        vacataireRepository.deleteById(vacataireId);
        return true;
    }

    @Override
    public List<VacataireDto> getAllVacataires() {
        List<VacataireDto> vacataireDtos = new ArrayList<>();
        List<Vacataire> vacataires = vacataireRepository.findAll();
        vacataires.forEach(vacataire -> {
            vacataireDtos.add(vacataireEntityToDto(vacataire));
        });
        return vacataireDtos;
    }

    /**
     * Map vacataire dto to vacataire entity
     */
    private VacataireDto vacataireEntityToDto(Vacataire vacataire){
        VacataireDto vacataireDto = new VacataireDto();
        vacataireDto.setId(vacataire.getId());
        vacataireDto.setLogin(vacataire.getLogin());
        vacataireDto.setNomUsuel(vacataire.getNomUsuel());
        vacataireDto.setPrenom(vacataire.getPrenom());
        vacataireDto.setMotDePasse(vacataire.getMotDePasse());
        vacataireDto.setMail(vacataire.getMail());
        vacataireDto.setSonCours(vacataire.getSonCours());
        return vacataireDto;
    }

    /**
     * Map vacataire entity to vacataire dto
     */
    private Vacataire vacataireDtoToEntity(VacataireDto vacataireDto){
        Vacataire vacataire = new Vacataire();
        vacataire.setLogin(vacataireDto.getLogin());
        vacataire.setNomUsuel(vacataireDto.getNomUsuel());
        vacataire.setId(vacataireDto.getId());
        vacataire.setPrenom(vacataireDto.getPrenom());
        vacataire.setMotDePasse(vacataireDto.getMotDePasse());
        vacataire.setMail(vacataireDto.getMail());
        vacataire.setSonCours(vacataireDto.getSonCours());
        return vacataire;
    }

}