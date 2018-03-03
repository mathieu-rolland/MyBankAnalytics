package com.fr.perso.mybank.service.mapper;

import com.fr.perso.mybank.domain.*;
import com.fr.perso.mybank.service.dto.ExtendedUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ExtendedUser and its DTO ExtendedUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ExtendedUserMapper extends EntityMapper<ExtendedUserDTO, ExtendedUser> {


    @Mapping(target = "accounts", ignore = true)
    ExtendedUser toEntity(ExtendedUserDTO extendedUserDTO);

    default ExtendedUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        ExtendedUser extendedUser = new ExtendedUser();
        extendedUser.setId(id);
        return extendedUser;
    }
}
