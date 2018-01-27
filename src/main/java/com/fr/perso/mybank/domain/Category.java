package com.fr.perso.mybank.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_label")
    private String label;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "category_parent",
               joinColumns = @JoinColumn(name="categories_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="parents_id", referencedColumnName="id"))
    private Set<Category> parents = new HashSet<>();

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Operation> operations = new HashSet<>();

    @ManyToMany(mappedBy = "parents")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Category> categories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Category label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Set<Category> getParents() {
        return parents;
    }

    public Category parents(Set<Category> categories) {
        this.parents = categories;
        return this;
    }

    public Category addParent(Category category) {
        this.parents.add(category);
        category.getCategories().add(this);
        return this;
    }

    public Category removeParent(Category category) {
        this.parents.remove(category);
        category.getCategories().remove(this);
        return this;
    }

    public void setParents(Set<Category> categories) {
        this.parents = categories;
    }

    public Set<Operation> getOperations() {
        return operations;
    }

    public Category operations(Set<Operation> operations) {
        this.operations = operations;
        return this;
    }

    public Category addOperations(Operation operation) {
        this.operations.add(operation);
        operation.getCategories().add(this);
        return this;
    }

    public Category removeOperations(Operation operation) {
        this.operations.remove(operation);
        operation.getCategories().remove(this);
        return this;
    }

    public void setOperations(Set<Operation> operations) {
        this.operations = operations;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public Category categories(Set<Category> categories) {
        this.categories = categories;
        return this;
    }

    public Category addCategory(Category category) {
        this.categories.add(category);
        category.getParents().add(this);
        return this;
    }

    public Category removeCategory(Category category) {
        this.categories.remove(category);
        category.getParents().remove(this);
        return this;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
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
        Category category = (Category) o;
        if (category.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), category.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
