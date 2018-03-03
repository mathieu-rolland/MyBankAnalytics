package com.fr.perso.mybank.parser.csv.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.factory.BankFactoryImpl;
import com.fr.perso.mybank.factory.IBankFactory;
import com.fr.perso.mybank.parser.csv.IParser;

public abstract class GenericParser implements IParser {

	protected File file;
	protected BankAccount account;
	private int nbLineHeader;
	protected IBankFactory bankFactory;
    
	private static final Logger log = LoggerFactory.getLogger(GenericParser.class);
	
	public GenericParser() {};
	
	public GenericParser(IBankFactory factory ) {
		this.bankFactory = factory;
	};
	
	public GenericParser( File f , BankAccount account , BankFactoryImpl bankFactory) {
		this.file = f;
		this.account = account;
		this.bankFactory = bankFactory;
	}
	
	@Override
	public void setFile(File f) {
		this.file = f;
	}

	@Override
	public void setBankAccount(BankAccount account) {
		this.account = account;
	}

	@Override
	public void setFactory(IBankFactory factory) {
		this.bankFactory = factory;
	}
	
	@Override
	public File getFile() {
		return file;
	}

	@Override
	public Date getExtractionDate() {
		return null;
	}

	@Override
	public BankAccount getBankAccount() {
		return account;
	}

	@Override
	public List<Operation> getOperations() {
		return null;
	}

	@Override
	public int parse() throws FileNotFoundException,IOException, Exception  {

		log.info( "Start to read file {}" , file.getAbsolutePath() );
		
		BufferedReader reader = new BufferedReader( new FileReader( file ));
		
		log.info( "Read file header" );
		int nbLineRead = parseFileHeader( reader );
		
		int nbSkippedLine = skipLine(reader, nbLineRead);
		log.info( "Number of line skipped : {}" , nbSkippedLine );
		
		nbLineRead = parserFileContent( reader );
		log.info( "End of parsing file. {} operations have been read." , account.getOperations().size() );
		
		return nbLineRead;
	}

	public abstract int parseFileHeader( BufferedReader reader ) throws IOException, Exception;
	public abstract int parserFileContent( BufferedReader reader ) throws IOException;
	public abstract int skipLine( BufferedReader reader , int currentLine ) throws IOException;
	
	@Override
	public void setHeaderNumberLines(int nbLineHeader) {
		this.nbLineHeader = nbLineHeader;
	}

	@Override
	public int getHeaderNumberLines() {
		return this.nbLineHeader;
	}
	
}
