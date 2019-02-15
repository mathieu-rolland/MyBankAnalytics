package com.perso.bank.account.domain;

import javax.persistence.Column;
import javax.persistence.Id;

public enum ParserType {

	FORTUNEO("FORTUNEO"), 
	CAISSE_EPARGNE("CAISSE_EPARGNE");
	
	@Id
	@Column(name = "NAME" )
	private String name;
	
	ParserType() {		
	}
	
	ParserType(String parserType){
		this.name = parserType;
	}
	
	public String toString() {
		return this.name;
	}
	
}
