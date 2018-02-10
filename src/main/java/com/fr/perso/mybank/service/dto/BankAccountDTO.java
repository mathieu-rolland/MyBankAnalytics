package com.fr.perso.mybank.service.dto;


import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the BankAccount entity.
 */
public class BankAccountDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

    private String name;

    private BigDecimal accountBalance;

    private Long ownerId;

    private String ownerName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(BigDecimal accountBalance) {
        this.accountBalance = accountBalance;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long extendedUserId) {
        this.ownerId = extendedUserId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String extendedUserName) {
        this.ownerName = extendedUserName;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankAccountDTO bankAccountDTO = (BankAccountDTO) o;
        if(bankAccountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankAccountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankAccountDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", accountBalance=" + getAccountBalance() +
            "}";
    }
}
