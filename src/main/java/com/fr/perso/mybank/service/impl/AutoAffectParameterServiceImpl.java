package com.fr.perso.mybank.service.impl;

import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fr.perso.mybank.domain.AutoAffectParameter;
import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.repository.AutoAffectParameterRepository;
import com.fr.perso.mybank.repository.BankAccountRepository;
import com.fr.perso.mybank.service.AutoAffectParameterService;
import com.fr.perso.mybank.service.BankAccountService;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;
import com.fr.perso.mybank.service.mapper.AutoAffectParameterMapper;

@Service
@Transactional
public class AutoAffectParameterServiceImpl implements AutoAffectParameterService {

	private Logger log = LoggerFactory.getLogger( AutoAffectParameterServiceImpl.class );
	
	private AutoAffectParameterRepository repository;
	
	private AutoAffectParameterMapper mapper;
	
	@Autowired
	private BankAccountService bankAccountService;
	
	
	public AutoAffectParameterServiceImpl(AutoAffectParameterRepository repository, AutoAffectParameterMapper mapper) {
		this.repository = repository;
		this.mapper = mapper;
	}
	
	@Override
	public AutoAffectParameterDTO save(AutoAffectParameterDTO autoAffectParameter) {
		log.debug( "Request to save AutoAffectParameter {}" , autoAffectParameter  );
		AutoAffectParameter param = mapper.toEntity(autoAffectParameter);
		param = repository.save( param );
		return mapper.toDto( param );
	}

	@Override
	public void delete(Long id) {
		log.debug( "Request to delete AutoAffectParameter with id {}" , id  );
		repository.delete( id );
	}

	@Override
	public Page<AutoAffectParameterDTO> findAll(Pageable pageable) {
		return repository.findAll( pageable ).map( mapper::toDto );
	}

	@Override
	public AutoAffectParameterDTO find(Long id) {
		return mapper.toDto( repository.findOne(id) );
	}

	public void overrideOperationsCategory( List<Operation> operations )
	{
	
		List<AutoAffectParameter> params = repository.findAll();
		
		for( Operation operation : operations ) {
			for( AutoAffectParameter param : params )
			{
				Pattern expression = Pattern.compile( param.getRegex() );
				Matcher m = expression.matcher( operation.getLabel() );
				//Regex match, affect operation to the current category
				//and stop regex match for this operation
				if( m.find() ) {
					log.debug( "Operation '{}' match with regex '{}' and will be affected to '{}'" , 
								operation.getLabel(), param.getRegex(), param.getTarget().getLabel() );	
					operation.getCategories().clear();
					operation.addCategory( param.getTarget() );
					break;
				}
			}
		}
		
	}

	@Override
	public void applyParametersOnExistingOperations() {
		
		int pageSizeLimit = 100;
		Pageable p = new PageRequest(0, pageSizeLimit );
		
		List<AutoAffectParameter> params = repository.findAll();
		
		Page<BankAccount> page = bankAccountService.findAllHasEntity(p);
		boolean pageProcessed = false;
		
		while( page.hasNext() || !pageProcessed ){
			
			List<BankAccount> accounts = page.getContent();
			for( BankAccount account : accounts ) {
				Set<Operation> operations = account.getOperations();
				for(Operation op : operations) {
					
					for( AutoAffectParameter param : params )
					{
						Pattern expression = Pattern.compile( param.getRegex() );
						Matcher m = expression.matcher( op.getLabel() );
						//Regex match, affect operation to the current category
						//and stop regex match for this operation
						if( m.find() ) {
							log.debug( "Operation '{}' match with regex '{}' and will be affected to '{}'" , 
										op.getLabel(), param.getRegex(), param.getTarget().getLabel() );	
							op.getCategories().clear();
							op.addCategory( param.getTarget() );
							break;
						}
					}
					
				}
				bankAccountService.save( account );
			}
			
			if( !page.isLast() ) {
				p = p.next();
				page = bankAccountService.findAllHasEntity(p);
			}else {
				pageProcessed = true;
			}
			
		}
		
		
	}	
	
}
