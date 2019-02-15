package com.perso.bank.account.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table( name = "AUTO_FILTERED_CATEGORY" ) 
public class AutoFilteredCategory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	@Column(name = "ID")
	private int id;
	
	@OneToOne
	@JoinColumn( name = "FILTERED_CATEGORY")
	private Category category;
	
	public Category getCategory() {
		return this.category;
	}
	
}
