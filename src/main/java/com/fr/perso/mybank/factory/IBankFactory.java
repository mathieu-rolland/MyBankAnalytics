package com.fr.perso.mybank.factory;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Category;
import com.fr.perso.mybank.domain.Operation;

public interface IBankFactory {

	public BankAccount createBankAccount();
	public Category createCategory();
	public Operation createOperation();
	
}
