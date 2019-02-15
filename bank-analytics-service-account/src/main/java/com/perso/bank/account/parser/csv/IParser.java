package com.perso.bank.account.parser.csv;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

import com.perso.bank.account.domain.BankAccount;
import com.perso.bank.account.domain.Operation;
import com.perso.bank.account.factory.IBankFactory;

public interface IParser {

	public File getFile();
	public void setHeaderNumberLines(int nbLineHeader);
	public int getHeaderNumberLines();
	public Date getExtractionDate();
	public BankAccount getBankAccount();
	public List<Operation> getOperations(); 
	public List<Operation> parse() throws FileNotFoundException, IOException, Exception;
	public void setFile( File f );
	public void setBankAccount( BankAccount account );
	public void setFactory(IBankFactory factory);
	
}
