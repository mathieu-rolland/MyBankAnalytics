package com.fr.perso.mybank.parser.csv;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;

public interface IParser {

	public File getFile();
	public void setHeaderNumberLines(int nbLineHeader);
	public int getHeaderNumberLines();
	public Date getExtractionDate();
	public BankAccount getBankAccount();
	public List<Operation> getOperations(); 
	public int parse() throws FileNotFoundException, IOException;
	
}
