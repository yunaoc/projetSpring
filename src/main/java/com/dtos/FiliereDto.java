package com.dtos;

import java.util.List;

import com.entities.Composante;
import com.entities.Cours;
import lombok.Data;

@Data
public class FiliereDto {
    private Long idFiliere;
    private String codeFiliere;
    private String nomFiliere;
    private Composante maComposante;
}
