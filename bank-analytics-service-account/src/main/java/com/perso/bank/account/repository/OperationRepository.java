package com.perso.bank.account.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.perso.bank.account.domain.Operation;

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

    @Query(
    			value = "select * from operation "
    			+ "operation where operation.jhi_date >= :start and operation.jhi_date <= :end "
    			+ " and operation.id not in ( select operations_id from operation_category where categories_id in("
    			+ " select FILTERED_CATEGORY from AUTO_FILTERED_CATEGORY ) )"
    			,
       		 nativeQuery = true)
    List<Operation> findBetweenDate( @Param("start") LocalDate start , @Param("end") LocalDate end );

    @Query(
    		value = "select * from operation where id in "
    				+ "(select operations_id from operation_category where categories_id = (select id from category where jhi_label ='Frais fixe'))"
    				+ " and jhi_date > :start and jhi_date < :end",
    		 nativeQuery = true
    )
	List<Operation> findRegularFeesForMonth(@Param("start") LocalDate start, @Param("end") LocalDate end);
    
	
	
}
