package com.entities;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

@Entity
@Data
public class Composante {
    @Id
    @GeneratedValue
    private Long idComposante;
    @Column(unique=true)
    private String nomComposante;
    @OneToMany
    @JsonManagedReference
    private List<Filiere> lesFilieres;
    @OneToMany(mappedBy = "maComposante")
    @JsonManagedReference
    private List<Gestionnaire> lesGestionnaires;
}
