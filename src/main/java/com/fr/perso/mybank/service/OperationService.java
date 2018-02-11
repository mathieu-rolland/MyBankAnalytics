package com.fr.perso.mybank.service;

import com.fr.perso.mybank.service.dto.OperationDTO;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Operation.
 */
public interface OperationService {

    /**
     * Save a operation.
     *
     * @param operationDTO the entity to save
     * @return the persisted entity
     */
    OperationDTO save(OperationDTO operationDTO);

    /**
     * Get all the operations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OperationDTO> findAll(Pageable pageable);

    /**
     * Get the "id" operation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OperationDTO findOne(Long id);

    /**
     * Delete the "id" operation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    List<OperationDTO> findbetweenDate(String start, String end);
    
}
