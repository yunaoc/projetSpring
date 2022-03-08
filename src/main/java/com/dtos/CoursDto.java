package com.dtos;

import com.entities.Vacataire;
import com.entities.Filiere;

import java.util.List;
import lombok.Data;

@Data
public class CoursDto {
    private Long id;
    private String intitule;
    private List<Filiere> lesFilieres;
    private List<Vacataire> lesVacataires;
}
