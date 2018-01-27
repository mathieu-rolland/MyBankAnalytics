package com.fr.perso.mybank.cucumber.stepdefs;

import com.fr.perso.mybank.MyBankAnalyticsApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = MyBankAnalyticsApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
