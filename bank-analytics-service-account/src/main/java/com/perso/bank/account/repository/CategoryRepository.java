package com.perso.bank.account.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.perso.bank.account.domain.Category;

/**
 * Spring Data JPA repository for the Category entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("select distinct category from Category category left join fetch category.parents")
    List<Category> findAllWithEagerRelationships();

    @Query("select category from Category category left join fetch category.parents where category.id =:id")
    Category findOneWithEagerRelationships(@Param("id") Long id);

}
