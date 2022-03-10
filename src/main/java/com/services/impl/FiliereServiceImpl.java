package com.services.impl;

import com.dtos.FiliereDto;
import com.entities.Composante;
import com.entities.Filiere;
import com.repositories.ComposanteRepository;
import com.repositories.FiliereRepository;
import com.services.FiliereService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("filiereService")
public class FiliereServiceImpl implements FiliereService {
    private final FiliereRepository filiereRepository;
    private final ComposanteRepository composanteRepository;

    public FiliereServiceImpl(FiliereRepository filiereRepository, ComposanteRepository composanteRepository){
        this.filiereRepository = filiereRepository;
        this.composanteRepository = composanteRepository;
    }

    @Override
    public FiliereDto createFiliere(FiliereDto filiereDto, Long idComposante) {
        Composante composante = composanteRepository.findById(idComposante).orElseThrow(() -> new EntityNotFoundException("Composante not found"));
        filiereDto.setMaComposante(composante);
        Filiere filiere = filiereDtoToEntity(filiereDto);
        filiere = filiereRepository.save(filiere);
        return filiereEntityToDto(filiere);
    }

    @Override
    public FiliereDto getFiliereById(Long filiereId) {
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        return filiereEntityToDto(filiere);
    }

    @Override
    public FiliereDto updateFiliereById(Long filiereId, FiliereDto filiereDto) {
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        if(filiereDto.getCodeFiliere() != null)
            filiere.setCodeFiliere(filiereDto.getCodeFiliere());
        if(filiereDto.getNomFiliere() != null)
            filiere.setNomFiliere(filiereDto.getNomFiliere());
        if(filiereDto.getMaComposante() != null)
            filiere.setMaComposante(filiereDto.getMaComposante());
        filiere = filiereRepository.save(filiere);
        return filiereEntityToDto(filiere);
    }

    @Override
    public boolean deleteFiliere(Long filiereId) {
        filiereRepository.deleteById(filiereId);
        return true;
    }

    public List<FiliereDto> getAllFilieres() {
        List<FiliereDto> filiereDtos = new ArrayList<>();
        List<Filiere> lesFiliere = filiereRepository.findAll();
        lesFiliere.forEach(filiere -> {
            filiereDtos.add(filiereEntityToDto(filiere));
        });
        return filiereDtos;
    }

    /**
     * Map filiere dto to filiere entity
     */
    private FiliereDto filiereEntityToDto(Filiere filiere){
        FiliereDto filiereDto = new FiliereDto();
        filiereDto.setIdFiliere(filiere.getIdFiliere());
        filiereDto.setNomFiliere(filiere.getNomFiliere());
        filiereDto.setCodeFiliere(filiere.getCodeFiliere());
        filiereDto.setMaComposante(filiere.getMaComposante());
        return filiereDto;
    }

    /**
     * Map filiere entity to filiere dto
     */
    private Filiere filiereDtoToEntity(FiliereDto filiereDto){
        Filiere filiere = new Filiere();
        filiere.setIdFiliere(filiereDto.getIdFiliere());
        filiere.setNomFiliere(filiereDto.getNomFiliere());
        filiere.setCodeFiliere(filiereDto.getCodeFiliere());
        filiere.setMaComposante(filiereDto.getMaComposante());
        return filiere;
    }
}