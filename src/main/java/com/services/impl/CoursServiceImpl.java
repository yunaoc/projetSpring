package com.services.impl;

import com.dtos.CoursDto;
import com.dtos.VacataireDto;
import com.entities.Cours;
import com.entities.Filiere;
import com.entities.Vacataire;
import com.repositories.CoursRepository;
import com.repositories.FiliereRepository;
import com.repositories.VacataireRepository;
import com.services.CoursService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service("coursService")
public class CoursServiceImpl implements CoursService {
    private final CoursRepository coursRepository;
    private final VacataireRepository vacataireRepository;
    private final FiliereRepository filiereRepository;

    public CoursServiceImpl(CoursRepository coursRepository, VacataireRepository vacataireRepository, FiliereRepository filiereRepository){
        this.coursRepository = coursRepository;
        this.vacataireRepository = vacataireRepository;
        this.filiereRepository = filiereRepository;
    }

    @Override
    public CoursDto createCours(CoursDto coursDto) {
        Cours cours = coursDtoToEntity(coursDto);
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    @Override
    public CoursDto getCoursById(Long coursId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        return coursEntityToDto(cours);
    }

    @Override
    public CoursDto updateCoursById(Long coursId, CoursDto coursDto) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        if(coursDto.getIntitule() != null)
            cours.setIntitule(coursDto.getIntitule());
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    @Override
    public CoursDto addVacataireCoursById(Long coursId, Long vacataireId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Vacataire vacataire = vacataireRepository.findById(vacataireId).orElseThrow(() -> new EntityNotFoundException("Vacataire not found"));
        cours.addVacataire(vacataire);
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    @Override
    public CoursDto removeVacataireCoursById(Long coursId, Long vacataireId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Vacataire vacataire = vacataireRepository.findById(vacataireId).orElseThrow(() -> new EntityNotFoundException("Vacataire not found"));
        cours.removeVacataire(vacataire);
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    // A tester
    @Override
    public CoursDto addFiliereCoursById(Long coursId, Long filiereId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        cours.addFiliere(filiere);
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    // A tester
    @Override
    public CoursDto removeFiliereCoursById(Long coursId, Long filiereId) {
        Cours cours = coursRepository.findById(coursId).orElseThrow(() -> new EntityNotFoundException("Cours not found"));
        Filiere filiere = filiereRepository.findById(filiereId).orElseThrow(() -> new EntityNotFoundException("Filiere not found"));
        cours.removeFiliere(filiere);
        cours = coursRepository.save(cours);
        return coursEntityToDto(cours);
    }

    @Override
    public boolean deleteCours(Long coursId) {
        coursRepository.deleteById(coursId);
        return true;
    }

    @Override
    public List<CoursDto> getAllCours() {
        List<CoursDto> coursDtos = new ArrayList<>();
        List<Cours> lesCours = coursRepository.findAll();
        lesCours.forEach(cours -> {
            coursDtos.add(coursEntityToDto(cours));
        });
        return coursDtos;
    }

    /**
     * Map cours dto to cours entity
     */
    private CoursDto coursEntityToDto(Cours cours){
        CoursDto coursDto = new CoursDto();
        coursDto.setId(cours.getId());
        coursDto.setIntitule(cours.getIntitule());
        coursDto.setLesFilieres(cours.getLesFilieres());
        coursDto.setLesVacataires(cours.getLesVacataires());
        return coursDto;
    }

    /**
     * Map cours entity to cours dto
     */
    private Cours coursDtoToEntity(CoursDto coursDto){
        Cours cours = new Cours();
        cours.setId(coursDto.getId());
        cours.setIntitule(coursDto.getIntitule());
        cours.setLesFilieres(coursDto.getLesFilieres());
        cours.setLesVacataires(coursDto.getLesVacataires());
        return cours;
    }
}
