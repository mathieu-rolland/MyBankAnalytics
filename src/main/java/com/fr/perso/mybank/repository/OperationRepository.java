package com.fr.perso.mybank.repository;

import com.fr.perso.mybank.domain.Operation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

/**
 * Spring Data JPA repository for the Operation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
    @Query("select distinct operation from Operation operation left join fetch operation.categories")
    List<Operation> findAllWithEagerRelationships();

    @Query("select operation from Operation operation left join fetch operation.categories where operation.id =:id")
    Operation findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select operation from Operation operation where operation.date >= :start and operation.date <= :end")
    List<Operation> findBetweenDate( @Param("start") LocalDate start , @Param("end") LocalDate end );
    
}
