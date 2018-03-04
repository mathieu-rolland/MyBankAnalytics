package com.fr.perso.mybank.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;

public interface AutoAffectParameterService {

	public AutoAffectParameterDTO save( AutoAffectParameterDTO autoAffectParameter );
	public void delete(Long id);
	public Page<AutoAffectParameterDTO> findAll(Pageable pageable);
	public AutoAffectParameterDTO find(Long id);
	
}
