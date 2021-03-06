package com.fr.perso.mybank.service;

import com.fr.perso.mybank.service.dto.ExtendedUserDTO;
import java.util.List;

/**
 * Service Interface for managing ExtendedUser.
 */
public interface ExtendedUserService {

    /**
     * Save a extendedUser.
     *
     * @param extendedUserDTO the entity to save
     * @return the persisted entity
     */
    ExtendedUserDTO save(ExtendedUserDTO extendedUserDTO);

    /**
     * Get all the extendedUsers.
     *
     * @return the list of entities
     */
    List<ExtendedUserDTO> findAll();

    /**
     * Get the "id" extendedUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ExtendedUserDTO findOne(Long id);

    /**
     * Delete the "id" extendedUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
