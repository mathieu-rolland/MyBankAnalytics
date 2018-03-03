package com.fr.perso.mybank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fr.perso.mybank.factory.BankFactoryImpl;

@Configuration
public class MyBankConfiguration {

	@Bean( name = "bankFactory" )
	public BankFactoryImpl createMyBankFactory() {
		return new BankFactoryImpl();
	}
	
}
