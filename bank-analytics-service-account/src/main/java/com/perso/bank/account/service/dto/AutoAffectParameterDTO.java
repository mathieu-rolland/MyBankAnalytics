package com.perso.bank.account.service.dto;

public class AutoAffectParameterDTO {

	private Long id;
	private String regex;
	private CategoryDTO target;
	
	public String getRegex() {
		return regex;
	}
	public void setRegex(String regex) {
		this.regex = regex;
	}
	public CategoryDTO getTarget() {
		return target;
	}
	public void setTarget(CategoryDTO target) {
		this.target = target;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public Long getId() {
		return id;
	}
	
	@Override
	public String toString() {
		return "AutoAffectParameterDTO [id=" + id + ", regex=" + regex + ", target=" + target + ", getRegex()="
				+ getRegex() + ", getTarget()=" + getTarget() + ", getId()=" + getId() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
	
}
