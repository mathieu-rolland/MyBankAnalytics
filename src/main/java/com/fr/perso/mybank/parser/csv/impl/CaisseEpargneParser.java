package com.fr.perso.mybank.parser.csv.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.factory.BankFactoryImpl;

public class CaisseEpargneParser extends GenericParser {

    private static final Logger log = LoggerFactory.getLogger(CaisseEpargneParser.class);

	private static final String SEPARATOR = ";";
	
	/*Line position - start from line 0*/
	private static final int LINE_HEADER_CODE_BANK=0;
	private static final int LINE_HEADER_CODE_BANK_NUMBER=1;
	private static final int LINE_HEADER_BANK_BALANCE=3;
	private static final int LINE_HEADER_DEFINITION=4;
	private static final int LINE_CONTENT_START= 5;
	
	private static final int COLUMN_DATE = 0;
	private static final int COLUMN_OPERATION_NUMBER = 1;
	private static final int COLUMN_OPERATION_LIBELLE = 2;
	private static final int COLUMN_OPERATION_DEBIT = 3;
	private static final int COLUMN_OPERATION_CREDIT = 4;
	private static final int COLUMN_OPERATION_DETAILS = 5;
	
	public CaisseEpargneParser(File f, BankAccount account , BankFactoryImpl bankFactory) {
		super(f, account , bankFactory);
	}

	@Override
	public int parseFileHeader(BufferedReader reader) throws IOException {
		
		int lineNumber = 0;
		
		while( reader.ready() ) {
			String line = reader.readLine();
			String[] splittedLine = line.split( SEPARATOR );
			
			log.debug( "Parsing header : {}" ,  line );
			
			if( lineNumber == LINE_HEADER_CODE_BANK_NUMBER ) {
				super.account.setName( splittedLine[1] );
			}else if ( lineNumber == LINE_HEADER_BANK_BALANCE ) {
				if ( splittedLine[4] != null ) {
					super.account.setAccountBalance( new BigDecimal( splittedLine[4].replace(",", ".") )  );
				}else {
					log.warn( "No balance found in the file {}" , this.file.getAbsoluteFile() );
				}
			}
			lineNumber++;
			
			if ( lineNumber >= LINE_CONTENT_START ) {
				return lineNumber;
			}
			
		}
		
		return lineNumber;
		
	}

	public int skipLine(BufferedReader reader , int currrentPosition ) throws IOException {

		int nbLineSkipped = 0;
		
		while( currrentPosition + nbLineSkipped < LINE_CONTENT_START ) {
			reader.readLine();
			nbLineSkipped++;
		}
		
		return nbLineSkipped;
		
	}
	
	@Override
	public int parserFileContent(BufferedReader reader) throws IOException {
		
		int nbLineRead = 0;
		
		while( reader.ready() ) {
			
			String line = reader.readLine();
			String[] splittedLine = line.split( SEPARATOR );
			
			String dateField = splittedLine[COLUMN_DATE];
			
			if( dateField.matches("^([0-9]{2}\\/?){3}$" ) ) { 
				Operation op = bankFactory.createOperation();
				
				if( isDebit(splittedLine) ) {
					op.setAmount( new BigDecimal( splittedLine[COLUMN_OPERATION_DEBIT].replace(",",".") ) );
				}else {
					if( splittedLine[COLUMN_OPERATION_CREDIT] != null && "".equals(splittedLine[COLUMN_OPERATION_CREDIT])) {
						op.setAmount( new BigDecimal( splittedLine[COLUMN_OPERATION_CREDIT].replace(",",".") ) );
					}else {
						log.warn( "The proccessed line has no operation amount ({})" , line );
					}
				}
				
				op.setDate( java.time.LocalDate.parse( splittedLine[COLUMN_DATE] , DateTimeFormatter.ofPattern("dd/MM/yy")) );
				op.setLabel( splittedLine[COLUMN_OPERATION_LIBELLE] );
				
				account.addOperation( op );
			}else {
				log.debug("The line will not be parsed : {} " , line);
			}
			
		}
		
		return nbLineRead;
	}

	private boolean isDebit( String[] line ) {
		return !("".equals(line[COLUMN_OPERATION_DEBIT]) || line[COLUMN_OPERATION_DEBIT] == null);
	}
	
}
