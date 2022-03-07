package com.controllers;

import com.dtos.FiliereDto;
import com.services.impl.FiliereServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/filiere")
public class FiliereController {

    private final FiliereServiceImpl filiereService;

    public FiliereController(FiliereServiceImpl filiereService) {
        this.filiereService = filiereService;
    }

    /**
     * <p>Get all filieres in the system</p>
     * @return List<FiliereDto>
     */
    @GetMapping
    public List<FiliereDto> getFiliere() {
        return filiereService.getAllFilieres();
    }

    /**
     * Method to get the filiere based on the ID
     */
    @GetMapping("/{id}")
    public FiliereDto getFiliere(@PathVariable Long id){
        return filiereService.getFiliereById(id);
    }

    /**
     * Create a new Filiere in the system
     */
    @PostMapping
    public FiliereDto createFiliere(final @RequestBody FiliereDto filiereDto){
        return filiereService.createFiliere(filiereDto);
    }

    /**
     * Method to update the filiere based on the ID
     */
    @PostMapping("/update/")
    public FiliereDto updateFiliereById(@RequestParam Long idFiliere, final @RequestBody FiliereDto filiereDto){
        return filiereService.updateFiliereById(idFiliere, filiereDto);
    }


    /**
     * Methode pour ajouter un cours à une filiere grace à leur id
     */
    @PostMapping("/addCoursb/")
    public FiliereDto addCoursFiliereById(@RequestParam Long idCours, @RequestParam Long idFiliere){
        return filiereService.addCoursFiliereById(idFiliere, idCours);
    }

    /**
     * Methode pour supprimer un cours d'une filiere grace à leur id
     */
    @DeleteMapping("/removeCours/")
    public FiliereDto removeCoursFiliereById(@RequestParam Long idCours, @RequestParam Long idFiliere){
        return filiereService.removeCoursFiliereById(idFiliere, idCours);
    }

    /**
     * Delete a filiere by its id
     */
    @DeleteMapping("/{id}")
    public Boolean deleteFiliere(@PathVariable Long id){
        return filiereService.deleteFiliere(id);
    }
}