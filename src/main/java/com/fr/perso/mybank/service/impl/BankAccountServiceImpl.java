package com.fr.perso.mybank.service.impl;

import com.fr.perso.mybank.service.AutoAffectParameterService;
import com.fr.perso.mybank.service.BankAccountService;
import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.domain.ParserType;
import com.fr.perso.mybank.factory.IBankFactory;
import com.fr.perso.mybank.parser.csv.IParser;
import com.fr.perso.mybank.repository.BankAccountRepository;
import com.fr.perso.mybank.service.dto.BankAccountDTO;
import com.fr.perso.mybank.service.mapper.BankAccountMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.NotImplementedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private AutoAffectParameterService parameterService;
    
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
    
    @Override
    public BankAccount save(BankAccount bankAccount) {
        log.debug("Request to save BankAccount : {}", bankAccount);
        BankAccount updatedBankAccount = bankAccountRepository.save(bankAccount);
        return updatedBankAccount;
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
	public boolean importOperations(File file , Long bankAccountId) {
		
		if( file == null ) {
			return false;
		}
		
		BankAccount account = bankAccountRepository.findOne( bankAccountId );
		
		IParser parser;
		if( ParserType.CAISSE_EPARGNE.equals( account.getParserType() ) ) {
			parser = factory.createCaisseEpargneParser();
		}else if( ParserType.FORTUNEO.equals( account.getParserType() ) ) {
			parser = factory.createFortuneoParser();
		}else {
			log.error( "The parser type {} is not implemented" , account.getParserType() );
			throw new NotImplementedException("The parser type "+ account.getParserType() +" is not implemented");
		}
		
		parser.setFile( file );
		parser.setBankAccount( account );
		
		try {
			List<Operation> operations = parser.parse();
			
			if( operations != null ) {
				BankAccount updatedAccount = parser.getBankAccount();
				parameterService.overrideOperationsCategory( operations );
				
				operations.forEach( updatedAccount::addOperation ) ; 
				
				if( operations.size() > 0) {
					log.debug( "{}", updatedAccount );
					bankAccountRepository.save( updatedAccount );
					log.debug( "{}", updatedAccount );
				}
				log.debug( "Nomber of operations read : " + operations.size() );
			}else {
				log.warn( "No operations was generated with the file {} " + file == null ? "null" : file.getAbsolutePath() );
			}
		} catch (IOException e) {
			log.error( "An error occured on parsing input file {}." , file == null ? "null" : file.getAbsolutePath()  );
			e.printStackTrace();
		} catch( Exception e) {
			log.error( "An error occured on parsing input file {}." , file == null ? "null" : file.getAbsolutePath()  );
			e.printStackTrace();
		}
		
		return false;
	}

	@Override
	public List<ParserType> getAllAvailableParser() {
		List<ParserType> parsers = new ArrayList<ParserType>();
		
		parsers.add( ParserType.FORTUNEO );
		parsers.add( ParserType.CAISSE_EPARGNE );
		
		return parsers;
	}

	@Override
	public Page<BankAccount> findAllHasEntity(Pageable pageable) {
		return bankAccountRepository.findAll(pageable);
	}
	
}
