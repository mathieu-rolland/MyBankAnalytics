package com.fr.perso.mybank.service.mapper;

import com.fr.perso.mybank.domain.*;
import com.fr.perso.mybank.service.dto.BankAccountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BankAccount and its DTO BankAccountDTO.
 */
@Mapper(componentModel = "spring", uses = {ExtendedUserMapper.class})
public interface BankAccountMapper extends EntityMapper<BankAccountDTO, BankAccount> {

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "owner.name", target = "ownerName")
    BankAccountDTO toDto(BankAccount bankAccount);

    @Mapping(target = "operations")
    @Mapping(source = "ownerId", target = "owner")
    BankAccount toEntity(BankAccountDTO bankAccountDTO);

    default BankAccount fromId(Long id) {
        if (id == null) {
            return null;
        }
        BankAccount bankAccount = new BankAccount();
        bankAccount.setId(id);
        return bankAccount;
    }
}
