package com.services.impl;

import com.dtos.CoursDto;
import com.dtos.FiliereDto;
import com.entities.Cours;
import com.entities.Filiere;
import com.repositories.CoursRepository;
import com.repositories.FiliereRepository;
import com.services.FiliereService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("filiereService")
public class FiliereServiceImpl implements FiliereService {
    private final FiliereRepository filiereRepository;
    private final CoursRepository coursRepository;

    public FiliereServiceImpl(FiliereRepository filiereRepository, CoursRepository coursRepository){
        this.filiereRepository = filiereRepository;
        this.coursRepository = coursRepository;
    }

    @Override
    public FiliereDto createFiliere(FiliereDto filiereDto) {
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
        filiere = filiereRepository.save(filiere);
        return filiereEntityToDto(filiere);
    }


    //A tester
    @Override
    public FiliereDto addCoursFiliereById(Long filiereId, Long coursId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        filiere.addCours(cours);
        filiere = filiereRepository.save(filiere);
        return filiereEntityToDto(filiere);
    }

    // A tester
    @Override
    public FiliereDto removeCoursFiliereById(Long filiereId, Long coursId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        filiere.removeFiliere(cours);
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
        filiereDto.setLesCours(filiere.getLesCours());
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
        filiere.setLesCours(filiereDto.getLesCours());
        return filiere;
    }
}