package com.controllers;

import com.dtos.GestionnaireDto;
import com.services.impl.GestionnaireServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badgeuse/gestionnaire")
public class GestionnaireController {

    private final GestionnaireServiceImpl gestionnaireService;

    public GestionnaireController(GestionnaireServiceImpl gestionnaireService) {this.gestionnaireService = gestionnaireService;}

    /**
     * <p>Get all gestionnaires in the system</p>
     * @return List<GestionnaresDto>
     */
    @GetMapping
    public List<GestionnaireDto> getGestionnaires() {
        return gestionnaireService.getAllGestionnaire();
    }

    /**
     * Method to get the gestionnaire based on the ID
     */
    @GetMapping("/{id}")
    public GestionnaireDto getGestionnaire(@PathVariable Long id){return gestionnaireService.getGestionnaireById(id);}

    /**
     * Create a new Gestionnaire in the system with idComposante
     */
    @PostMapping("/")
    public GestionnaireDto createGestionnaire(final @RequestBody GestionnaireDto gestionnaireDto, @RequestParam Long id){
        return gestionnaireService.createGestionnaire(gestionnaireDto, id);
    }

    /**
     * Update a Gestionnaire in the system
     */
    @PutMapping("/")
    public GestionnaireDto updateGestionnaire(final @RequestBody GestionnaireDto gestionnaireDto, @RequestParam Long id){
        return gestionnaireService.updateGestionnaire(gestionnaireDto,id);
    }

    /**
     * Delete a gestionnaire by its id
     */
    @DeleteMapping("/")
    public Boolean deleteGestionnaire(@RequestParam Long id){
        return gestionnaireService.deleteGestionnaire(id);
    }

}
