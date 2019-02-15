package com.perso.bank.account.factory;

import com.perso.bank.account.domain.AutoAffectParameter;
import com.perso.bank.account.domain.BankAccount;
import com.perso.bank.account.domain.Category;
import com.perso.bank.account.domain.Operation;
import com.perso.bank.account.parser.csv.IParser;

public interface IBankFactory {

	public BankAccount createBankAccount();
	public Category createCategory();
	public Operation createOperation();
	public AutoAffectParameter createAutoAffectParameter();
	public IParser createCaisseEpargneParser();
	public IParser createFortuneoParser();
	
}
