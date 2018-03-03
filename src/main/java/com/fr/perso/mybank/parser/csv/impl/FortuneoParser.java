package com.fr.perso.mybank.parser.csv.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fr.perso.mybank.domain.BankAccount;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.factory.IBankFactory;

public class FortuneoParser extends GenericParser {

    private static final Logger log = LoggerFactory.getLogger(FortuneoParser.class);

	private static final String SEPARATOR = ";";
	private static final String DATE_PATTERN = "dd/MM/yyyy";
	
	private static final int COLUMN_DATE = 0;
	private static final int COLUMN_OPERATION_LIBELLE = 2;
	private static final int COLUMN_OPERATION_DEBIT = 3;
	private static final int COLUMN_OPERATION_CREDIT = 4;
	
	private static final int LINE_SIZE = 5;
	
	private DateTimeFormatter datePattern;
	
	public FortuneoParser( IBankFactory factory ) {
		super( factory );
		this.datePattern = DateTimeFormatter.ofPattern( DATE_PATTERN );
	}
	
	public FortuneoParser() {
		super();
		this.datePattern = DateTimeFormatter.ofPattern( DATE_PATTERN );
	}
	
	@Override
	public int parseFileHeader(BufferedReader reader) throws IOException, Exception {
		if(reader.ready() ) {
			reader.readLine();
			return 1;
		}else {
			log.error("Could not read file header");
			throw new Exception( "Could not read file header" );
		}
	}

	@Override
	public int parserFileContent(BufferedReader reader) throws IOException {
		
		int nbLineRead = 0;
		
		while( reader.ready() ) {
			String line = reader.readLine();
			if( line != null ) {
				
				String[] splittedLine = line.split( SEPARATOR );
				
				if( splittedLine.length < LINE_SIZE ) {
					log.warn( "The line {} is too small" + line );
				}else {
					
					Operation op = this.bankFactory.createOperation();
					
					BigDecimal amount; 
					if( isDebit( splittedLine ) 
						&& splittedLine[COLUMN_OPERATION_DEBIT] != null ) {
						amount = new BigDecimal( splittedLine[COLUMN_OPERATION_DEBIT].trim().replace(",", ".") );
					}else if( splittedLine[COLUMN_OPERATION_CREDIT] != null ) {
						amount = new BigDecimal( splittedLine[COLUMN_OPERATION_CREDIT].trim().replace(",", ".") );
					}else {
						log.warn( "Could not parse amount of line {}" , line );
						continue;
					}
					
					String label = splittedLine[ COLUMN_OPERATION_LIBELLE ];
					LocalDate date = LocalDate.parse( splittedLine[COLUMN_DATE] , this.datePattern );
					
					op.setLabel( label );
					op.setAmount( amount );
					op.setDate( date );
					
					super.account.addOperation( op );
					nbLineRead++;
				}
			}
		}
		
		return 0;
	}

	@Override
	public int skipLine(BufferedReader reader, int currentLine) throws IOException {
		return 0;
	}

	private boolean isDebit( String[] line ) {
		if ( line != null && line.length > COLUMN_OPERATION_DEBIT  ) {
			return !("".equals(line[COLUMN_OPERATION_DEBIT]) || line[COLUMN_OPERATION_DEBIT] == null);
		}else {
			return false;
		}
	}
	
}
