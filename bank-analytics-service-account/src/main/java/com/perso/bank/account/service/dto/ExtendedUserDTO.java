package com.perso.bank.account.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ExtendedUser entity.
 */
public class ExtendedUserDTO implements Serializable {

    private Long id;

    private String name;

    private String firstname;

    private String address;

    private String mail;

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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ExtendedUserDTO extendedUserDTO = (ExtendedUserDTO) o;
        if(extendedUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), extendedUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ExtendedUserDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", address='" + getAddress() + "'" +
            ", mail='" + getMail() + "'" +
            "}";
    }
}
