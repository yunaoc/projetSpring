package com.controllers;

import com.dtos.ComposanteDto;
import com.services.impl.ComposanteServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badgeuse/composante")
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
     * Delete a composante by its id
     */
    @DeleteMapping("/{id}")
    public Boolean deleteComposante(@PathVariable Long id){
        return composanteService.deleteComposante(id);
    }
}