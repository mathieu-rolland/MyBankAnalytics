package com.fr.perso.mybank.service.mapper;

import com.fr.perso.mybank.domain.*;
import com.fr.perso.mybank.service.dto.OperationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Operation and its DTO OperationDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class, BankAccountMapper.class})
public interface OperationMapper extends EntityMapper<OperationDTO, Operation> {

    @Mappings( {
    	@Mapping( source = "account.id", target = "accountId"),
    	@Mapping( source = "account.name", target = "accountName")
    })
    OperationDTO toDto(Operation operation);

    @Mapping(source = "accountId", target = "account")
    Operation toEntity(OperationDTO operationDTO);

    default Operation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Operation operation = new Operation();
        operation.setId(id);
        return operation;
    }
}
