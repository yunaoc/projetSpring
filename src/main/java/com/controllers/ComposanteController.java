package com.controllers;

import com.dtos.ComposanteDto;
import com.services.impl.ComposanteServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/composante")
public class ComposanteController {

    private final ComposanteServiceImpl composanteService;

    public ComposanteController(ComposanteServiceImpl composanteService) {
        this.composanteService = composanteService;
    }

    /**
     * <p>Get all composantes in the system</p>
     * @return List<ComposanteDto>
     */
    @GetMapping
    public List<ComposanteDto> getComposante() {
        return composanteService.getAllComposante();
    }

    /**
     * Method to get the composante based on the ID
     */
    @GetMapping("/{id}")
    public ComposanteDto getComposante(@PathVariable Long id){
        return composanteService.getComposanteById(id);
    }

    /**
     * Create a new Composante in the system
     */
    @PostMapping
    public ComposanteDto createComposante(final @RequestBody ComposanteDto composanteDto){
        return composanteService.createComposante(composanteDto);
    }

    /**
     * Method to update the composante based on the ID
     */
    @PutMapping("/update/")
    public ComposanteDto updateComposanteById(@RequestParam Long idComposante, final @RequestBody ComposanteDto composanteDto){
        return composanteService.updateComposanteById(idComposante, composanteDto);
    }

    /**
     * Methode pour ajouter un gestionnaire à une composante grace à leur id
     */
    @PutMapping("/addGestionnaire/")
    public ComposanteDto addGestionnaireComposanteById(@RequestParam Long idComposante, @RequestParam Long idGestionnaire){
        return composanteService.addGestionnaireComposanteById(idComposante, idGestionnaire);
    }

    /**
     * Methode pour supprimer un gestionnaire d'une composante grace à leur id
     */
    @DeleteMapping("/removeGestionnaire/")
    public ComposanteDto removeGestionnaireComposanteById(@RequestParam Long idComposante, @RequestParam Long idGestionnaire){
        return composanteService.removeGestionnaireComposanteById(idComposante, idGestionnaire);
    }

    /**
     * Methode pour ajouter un gestionnaire à une composante grace à leur id
     */
    @PutMapping("/addFiliere/")
    public ComposanteDto addFiliereComposanteById(@RequestParam Long idComposante, @RequestParam Long idFiliere){
        return composanteService.addFiliereComposanteById(idComposante, idFiliere);
    }

    /**
     * Methode pour supprimer un gestionnaire d'une composante grace à leur id
     */
    @DeleteMapping("/removeFiliere/")
    public ComposanteDto removeFiliereComposanteById(@RequestParam Long idComposante, @RequestParam Long idFiliere){
        return composanteService.removeFiliereComposanteById(idComposante, idFiliere);
    }

    /**
     * Delete a composante by its id
     */
    @DeleteMapping("/{id}")
    public Boolean deleteComposante(@PathVariable Long id){
        return composanteService.deleteComposante(id);
    }
}