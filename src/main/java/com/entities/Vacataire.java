package com.entities;

import javax.persistence.*;

@Entity
public class Vacataire extends Utilisateur{
    @ManyToOne
    private Cours sonCours;

    public Vacataire() {
        this.sonCours = null;
    }

    public Cours getSonCours() {
        return sonCours;
    }

    public void setSonCours(Cours sonCours) {
        this.sonCours = sonCours;
    }
}


