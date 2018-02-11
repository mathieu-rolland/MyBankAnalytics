package com.fr.perso.mybank.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A BankAccount.
 */
@Entity
@Table(name = "bank_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "account_balance", precision=10, scale=2)
    private BigDecimal accountBalance;

    @OneToMany(mappedBy = "account" , cascade = CascadeType.ALL )
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Operation> operations = new HashSet<Operation>();

    @ManyToOne
    private ExtendedUser owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public BankAccount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAccountBalance() {
        return accountBalance;
    }

    public BankAccount accountBalance(BigDecimal accountBalance) {
        this.accountBalance = accountBalance;
        return this;
    }

    public void setAccountBalance(BigDecimal accountBalance) {
        this.accountBalance = accountBalance;
    }

    public Set<Operation> getOperations() {
        return operations;
    }

    public BankAccount operations(Set<Operation> operations) {
        this.operations = operations;
        return this;
    }

 
    public BankAccount addOperation(Operation operation) {
        this.operations.add(operation);
        operation.setAccount(this);
        return this;
    }

    public BankAccount removeOperation(Operation operation) {
        this.operations.remove(operation);
        operation.setAccount(null);
        return this;
    }

    public void setOperations(Set<Operation> operations) {
        this.operations = operations;
    }

    public ExtendedUser getOwner() {
        return owner;
    }

    public BankAccount owner(ExtendedUser extendedUser) {
        this.owner = extendedUser;
        return this;
    }

    public void setOwner(ExtendedUser extendedUser) {
        this.owner = extendedUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BankAccount bankAccount = (BankAccount) o;
        if (bankAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
    	String operationsStr = "";
    	for( Operation op : operations ) {
    		operationsStr += op + ", ";
    	}
    	if ( operationsStr != null && operationsStr.length() > " , ".length() ) {
    			operationsStr = operationsStr.substring(0, operationsStr.length() - (" , ".length()) );
    	}
        return "BankAccount{" +
    		"Owner=" + owner +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", accountBalance=" + getAccountBalance() +
            ", operations=[" + operationsStr + "]" +            	
            "}";
    }
}
