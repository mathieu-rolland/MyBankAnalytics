package com.perso.bank.account.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount", precision=10, scale=2)
    private BigDecimal amount;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "jhi_label")
    private String label;
    
    @Column(name = "jhi_details")
    private String details;
    
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "operation_category",
               joinColumns = @JoinColumn(name="operations_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="categories_id", referencedColumnName="id"))
    private Set<Category> categories = new HashSet<>();

    @ManyToOne
    private BankAccount account;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Operation label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }
    
    public Operation details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }
    
    public String getDetails() {
    	return details;
    }
    
    public String getLabel() {
    	return label;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }

    public Operation amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public Operation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Operation categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Operation addCategory(Category category) {
        this.categories.add(category);
        category.getOperations().add(this);
        return this;
    }

    public Operation removeCategory(Category category) {
        this.categories.remove(category);
        category.getOperations().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public BankAccount getAccount() {
        return account;
    }

    public Operation account(BankAccount bankAccount) {
        this.account = bankAccount;
        return this;
    }

    public void setAccount(BankAccount bankAccount) {
        this.account = bankAccount;
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
        Operation operation = (Operation) o;
        if (operation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", date='" + getDate() + "'" +
            ", label='" + getLabel() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
