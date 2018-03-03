package com.fr.perso.mybank.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
