package com.perso.bank.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.perso.bank.account.domain.AutoAffectParameter;

@Repository
public interface AutoAffectParameterRepository extends JpaRepository<AutoAffectParameter, Long> {


}
