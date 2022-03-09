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

    public void addGestionnaire(Gestionnaire gestionnaire) {
        this.lesGestionnaires.add(gestionnaire);
    }

    public void removeGestionnaire(Gestionnaire gestionnaire) {
        this.lesGestionnaires.remove(gestionnaire);
    }

    public void addFiliere(Filiere filiere) {
        this.lesFilieres.add(filiere);
    }

    public void removeFiliere(Filiere filiere) {
        this.lesFilieres.remove(filiere);
    }
}
