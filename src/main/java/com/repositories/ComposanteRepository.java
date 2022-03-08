package com.repositories;

import com.entities.Composante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComposanteRepository extends JpaRepository<Composante, Long> {
}