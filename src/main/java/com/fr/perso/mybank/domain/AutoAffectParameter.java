package com.fr.perso.mybank.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "auto_affect_parameter")
public class AutoAffectParameter implements Serializable {
	
	private static final long serialVersionUID = 5736149614172242721L;

	@Id
	@GeneratedValue( strategy = GenerationType.IDENTITY )
	private Long id;
	
	
	@Column(name = "REGEX")
	private String regex;
	
	@ManyToOne
	@JoinColumn( name = "affected_category" )
	private Category target;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRegex() {
		return regex;
	}

	public void setRegex(String regex) {
		this.regex = regex;
	}

	public Category getTarget() {
		return target;
	}

	public void setTarget(Category target) {
		this.target = target;
	}

	
	
}
