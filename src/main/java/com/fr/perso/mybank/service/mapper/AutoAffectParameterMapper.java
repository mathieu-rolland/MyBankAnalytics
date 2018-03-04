package com.fr.perso.mybank.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fr.perso.mybank.domain.AutoAffectParameter;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;

@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface AutoAffectParameterMapper extends EntityMapper<AutoAffectParameterDTO, AutoAffectParameter> {


    @Mapping( source = "target" , target = "target")
    AutoAffectParameter toEntity(AutoAffectParameterDTO autoAffectParameterDTO);

    default AutoAffectParameter fromId(Long id) {
        if (id == null) {
            return null;
        }
        AutoAffectParameter param = new AutoAffectParameter();
        param.setId(id);
        return param;
    }
}

