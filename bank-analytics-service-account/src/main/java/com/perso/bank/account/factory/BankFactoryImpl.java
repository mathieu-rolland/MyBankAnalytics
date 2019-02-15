package com.perso.bank.account.factory;

import com.perso.bank.account.domain.AutoAffectParameter;
import com.perso.bank.account.domain.BankAccount;
import com.perso.bank.account.domain.Category;
import com.perso.bank.account.domain.Operation;
import com.perso.bank.account.parser.csv.IParser;
import com.perso.bank.account.parser.csv.impl.CaisseEpargneParser;
import com.perso.bank.account.parser.csv.impl.FortuneoParser;

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
	public IParser createCaisseEpargneParser() {
		return new CaisseEpargneParser(this);
	}

	@Override
	public IParser createFortuneoParser() {
		return new FortuneoParser(this);
	}

	@Override
	public AutoAffectParameter createAutoAffectParameter() {
		return new AutoAffectParameter();
	}
	
}
