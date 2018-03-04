package com.fr.perso.mybank.factory;

import com.fr.perso.mybank.domain.AutoAffectParameter;
import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Category;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.parser.csv.IParser;

public interface IBankFactory {

	public BankAccount createBankAccount();
	public Category createCategory();
	public Operation createOperation();
	public AutoAffectParameter createAutoAffectParameter();
	public IParser createCaisseEpargneParser();
	public IParser createFortuneoParser();
	
}
