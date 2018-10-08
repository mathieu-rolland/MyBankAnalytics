package com.fr.perso.mybank.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fr.perso.mybank.domain.AutoFilteredCategory;

public interface AutoFilteredCategoryRepository extends JpaRepository<AutoFilteredCategory, Long>  {

}
