package com.fr.perso.mybank.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Operation entity.
 */
public class OperationDTO implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;

    private BigDecimal amount;

    private LocalDate date;

    private Set<CategoryDTO> categories = new HashSet<>();

    private Long accountId;

    private String accountName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountName() {
    	return accountName;
    }
    
    public void setAccountName( String accountName ) {
    	this.accountName = accountName;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<CategoryDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryDTO> categories) {
        this.categories = categories;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long bankAccountId) {
        this.accountId = bankAccountId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OperationDTO operationDTO = (OperationDTO) o;
        if(operationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OperationDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
