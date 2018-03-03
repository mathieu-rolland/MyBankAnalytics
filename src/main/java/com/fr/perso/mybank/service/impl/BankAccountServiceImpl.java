package com.fr.perso.mybank.service.impl;

import com.fr.perso.mybank.service.BankAccountService;
import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.factory.IBankFactory;
import com.fr.perso.mybank.parser.csv.IParser;
import com.fr.perso.mybank.repository.BankAccountRepository;
import com.fr.perso.mybank.service.dto.BankAccountDTO;
import com.fr.perso.mybank.service.mapper.BankAccountMapper;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BankAccount.
 */
@Service
@Transactional
public class BankAccountServiceImpl implements BankAccountService {

    private final Logger log = LoggerFactory.getLogger(BankAccountServiceImpl.class);

    private final BankAccountRepository bankAccountRepository;

    private final BankAccountMapper bankAccountMapper;

    private final IBankFactory factory;
    
    public BankAccountServiceImpl(
    			BankAccountRepository bankAccountRepository, 
    			BankAccountMapper bankAccountMapper,
    			IBankFactory factory) {
        this.bankAccountRepository = bankAccountRepository;
        this.bankAccountMapper = bankAccountMapper;
        this.factory = factory;
    }

    /**
     * Save a bankAccount.
     *
     * @param bankAccountDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BankAccountDTO save(BankAccountDTO bankAccountDTO) {
        log.debug("Request to save BankAccount : {}", bankAccountDTO);
        BankAccount bankAccount = bankAccountMapper.toEntity(bankAccountDTO);
        bankAccount = bankAccountRepository.save(bankAccount);
        return bankAccountMapper.toDto(bankAccount);
    }

    /**
     * Get all the bankAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BankAccountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BankAccounts");
        return bankAccountRepository.findAll(pageable)
            .map(bankAccountMapper::toDto);
    }

    /**
     * Get one bankAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BankAccountDTO findOne(Long id) {
        log.debug("Request to get BankAccount : {}", id);
        BankAccount bankAccount = bankAccountRepository.findOne(id);
        return bankAccountMapper.toDto(bankAccount);
    }

    /**
     * Delete the bankAccount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BankAccount : {}", id);
        bankAccountRepository.delete(id);
    }

	@Override
	public boolean importOprations(File file , Long bankAccountId) {
		
		if( file == null ) {
			return false;
		}
		
		IParser parser = factory.createParser();
		
		parser.setFile( file );
		BankAccount account = bankAccountRepository.findOne( bankAccountId );
		parser.setBankAccount( account );
		
		try {
			int nbLineRead = parser.parse();
			BankAccount updatedAccount = parser.getBankAccount();
			if( updatedAccount != null && updatedAccount.getOperations().size() > 0) {
				log.debug( "{}", updatedAccount );
				bankAccountRepository.save( updatedAccount );
				log.debug( "{}", updatedAccount );
			}
			log.debug( "Nomber of line read : " + nbLineRead );
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
}
