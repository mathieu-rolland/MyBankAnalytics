package com.fr.perso.mybank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fr.perso.mybank.domain.AutoAffectParameter;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;

@Repository
public interface AutoAffectParameterRepository extends JpaRepository<AutoAffectParameter, Long> {


}
