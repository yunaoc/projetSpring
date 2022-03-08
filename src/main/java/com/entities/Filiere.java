package com.entities;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.springframework.lang.NonNullFields;

@Entity
@Data
public class Filiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFiliere;
    private String codeFiliere;
    private String nomFiliere;
    @ManyToOne
    @JoinColumn(name = "id_composante")
    @JsonBackReference
    private Composante maComposante;
}
