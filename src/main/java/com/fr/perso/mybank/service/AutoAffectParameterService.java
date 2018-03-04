package com.fr.perso.mybank.service;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;

public interface AutoAffectParameterService {

	public AutoAffectParameterDTO save( AutoAffectParameterDTO autoAffectParameter );
	public void delete(Long id);
	public Page<AutoAffectParameterDTO> findAll(Pageable pageable);
	public AutoAffectParameterDTO find(Long id);
	public void overrideOperationsCategory( List<Operation> set );
	public void applyParametersOnExistingOperations();
	
}
