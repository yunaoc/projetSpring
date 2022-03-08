package com.controllers;

import com.dtos.CoursDto;
import com.services.impl.CoursServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badgeuse/cours")
public class CoursController {

    private final CoursServiceImpl coursService;

    public CoursController(CoursServiceImpl coursService) {
        this.coursService = coursService;
    }

    /**
     * <p>Get all cours in the system</p>
     * @return List<CoursDto>
     */
    @GetMapping
    public List<CoursDto> getCours() {
        return coursService.getAllCours();
    }

    /**
     * Method to get the cours based on the ID
     */
    @GetMapping("/{id}")
    public CoursDto getCours(@PathVariable Long id){
        return coursService.getCoursById(id);
    }

    /**
     * Create a new Cours in the system
     */
    @PostMapping
    public CoursDto createCours(final @RequestBody CoursDto coursDto){
        return coursService.createCours(coursDto);
    }

    /**
     * Method to update the cours based on the ID
     */
    @PutMapping("/update/")
    public CoursDto updateCoursById(@RequestParam Long idCours, final @RequestBody CoursDto coursDto){
        return coursService.updateCoursById(idCours, coursDto);
    }

    /**
     * Methode pour ajouter un vacataire à un cours grace à leur id
     */
    @PutMapping("/addVacataire/")
    public CoursDto addVacataireCoursById(@RequestParam Long idCours, @RequestParam Long idVacataire){
        return coursService.addVacataireCoursById(idCours, idVacataire);
    }

    /**
     * Methode pour supprimer un vacataire d'un cours grace à leur id
     */
    @PutMapping("/removeVacataire/")
    public CoursDto removeVacataireCoursById(@RequestParam Long idCours, @RequestParam Long idVacataire){
        return coursService.removeVacataireCoursById(idCours, idVacataire);
    }

    /**
     * Methode pour ajouter un vacataire à un cours grace à leur id
     */
    @PutMapping("/addFiliere/")
    public CoursDto addFiliereCoursById(@RequestParam Long idCours, @RequestParam Long idFiliere){
        return coursService.addFiliereCoursById(idCours, idFiliere);
    }

    /**
     * Methode pour supprimer un vacataire d'un cours grace à leur id
     */
    @PutMapping("/removeFiliere/")
    public CoursDto removeFiliereCoursById(@RequestParam Long idCours, @RequestParam Long idFiliere){
        return coursService.removeFiliereCoursById(idCours, idFiliere);
    }

    /**
     * Delete a cours by it's id
     */
    @DeleteMapping("/")
    public Boolean deleteCours(@RequestParam Long id){
        return coursService.deleteCours(id);
    }
}