package com.perso.bank.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.perso.bank.account.domain.AutoFilteredCategory;

public interface AutoFilteredCategoryRepository extends JpaRepository<AutoFilteredCategory, Long>  {

}
