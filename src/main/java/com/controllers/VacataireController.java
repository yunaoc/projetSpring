package com.controllers;

import com.dtos.VacataireDto;
import com.services.impl.VacataireServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badgeuse/vacataire")
public class VacataireController {
    
    private final VacataireServiceImpl vacataireService;

    public VacataireController(VacataireServiceImpl vacataireService) {
        this.vacataireService = vacataireService;
    }

    /**
     * <p>Get all vacataires in the system</p>
     * @return List<VacataireDto>
     */
    @GetMapping
    public List<VacataireDto> getVacataires() {
        return vacataireService.getAllVacataires();
    }

    /**
     * Method to get the vacataire based on the ID
     */
    @GetMapping("/{id}")
    public VacataireDto getVacataire(@PathVariable Long id){
        return vacataireService.getVacataireById(id);
    }

    /**
     * Create a new Vacataire in the system
     */
    @PostMapping
    public VacataireDto createVacataire(final @RequestBody VacataireDto vacataireDto){
        return vacataireService.createVacataire(vacataireDto);
    }

    /**
     * Method to update the vacataire based on the ID
     */
    @PutMapping("/update/")
    public VacataireDto updateVacataireById(@RequestParam Long id, final @RequestBody VacataireDto vacataireDto){
        return vacataireService.updateVacataireById(id, vacataireDto);
    }

    /**
     * Delete a vacataire by it's id
     */
    @DeleteMapping("/")
    public Boolean deleteVacataire(@RequestParam Long id){
        return vacataireService.deleteVacataire(id);
    }
}
