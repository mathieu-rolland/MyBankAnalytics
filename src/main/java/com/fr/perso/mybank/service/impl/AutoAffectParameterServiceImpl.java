package com.fr.perso.mybank.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fr.perso.mybank.domain.AutoAffectParameter;
import com.fr.perso.mybank.repository.AutoAffectParameterRepository;
import com.fr.perso.mybank.service.AutoAffectParameterService;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;
import com.fr.perso.mybank.service.mapper.AutoAffectParameterMapper;

@Service
@Transactional
public class AutoAffectParameterServiceImpl implements AutoAffectParameterService {

	private Logger log = LoggerFactory.getLogger( AutoAffectParameterServiceImpl.class );
	
	private AutoAffectParameterRepository repository;
	private AutoAffectParameterMapper mapper;
	
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

}
