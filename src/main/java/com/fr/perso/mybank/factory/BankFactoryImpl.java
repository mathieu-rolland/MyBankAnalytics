package com.fr.perso.mybank.factory;

import org.springframework.context.annotation.Bean;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Category;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.parser.csv.IParser;
import com.fr.perso.mybank.parser.csv.impl.CaisseEpargneParser;

public class BankFactoryImpl implements IBankFactory {
	
	@Override
	public BankAccount createBankAccount() {
		return new BankAccount();
	}

	@Override
	public Category createCategory() {
		return new Category();
	}

	@Override
	public Operation createOperation() {
		return new Operation();
	}

	@Override
	public IParser createParser() {
		return new CaisseEpargneParser(this);
	}
	
}
