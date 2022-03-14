package com.controllers;

import com.dtos.UtilisateurDto;
import com.services.impl.UtilisateurServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/badgeuse/utilisateur")
public class UtilisateurController {

    private final UtilisateurServiceImpl utilisateurService;

    public UtilisateurController(UtilisateurServiceImpl utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    /**
     * <p>Get all utilisateurs in the system</p>
     *
     * @return List<UtilisateurDto>
     */
    @GetMapping
    public List<UtilisateurDto> getUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }

    /**
     * Method to get the utilisateur based on the ID
     */
    @PostMapping("/")
    public UtilisateurDto getUtilisateur(final @RequestBody UtilisateurDto utilisateurDto) {
        return utilisateurService.getUtilisateur(utilisateurDto.getLogin(), utilisateurDto.getMotDePasse());
    }
}
