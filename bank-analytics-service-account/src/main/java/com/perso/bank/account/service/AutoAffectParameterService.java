package com.perso.bank.account.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.perso.bank.account.domain.Operation;
import com.perso.bank.account.service.dto.AutoAffectParameterDTO;

public interface AutoAffectParameterService {

	public AutoAffectParameterDTO save( AutoAffectParameterDTO autoAffectParameter );
	public void delete(Long id);
	public Page<AutoAffectParameterDTO> findAll(Pageable pageable);
	public AutoAffectParameterDTO find(Long id);
	public void overrideOperationsCategory( List<Operation> set );
	public void applyParametersOnExistingOperations();
	
}
