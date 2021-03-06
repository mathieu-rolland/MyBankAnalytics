package com.fr.perso.mybank.service;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.ParserType;
import com.fr.perso.mybank.service.dto.BankAccountDTO;
import java.io.File;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing BankAccount.
 */
public interface BankAccountService {

    /**
     * Save a bankAccount.
     *
     * @param bankAccountDTO the entity to save
     * @return the persisted entity
     */
    BankAccountDTO save(BankAccountDTO bankAccountDTO);

    /**
     * Get all the bankAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BankAccountDTO> findAll(Pageable pageable);
    Page<BankAccount> findAllHasEntity(Pageable pageable);
    
    /**
     * Get the "id" bankAccount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BankAccountDTO findOne(Long id);

    /**
     * Delete the "id" bankAccount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
	boolean importOperations(File file, Long bankAccountId);

	public List<ParserType> getAllAvailableParser();

	public BankAccount save(BankAccount bankAccount);
    
}
