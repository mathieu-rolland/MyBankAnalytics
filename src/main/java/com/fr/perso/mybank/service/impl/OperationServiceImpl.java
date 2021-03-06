package com.fr.perso.mybank.service.impl;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fr.perso.mybank.domain.AutoFilteredCategory;
import com.fr.perso.mybank.domain.Operation;
import com.fr.perso.mybank.repository.AutoFilteredCategoryRepository;
import com.fr.perso.mybank.repository.OperationRepository;
import com.fr.perso.mybank.service.OperationService;
import com.fr.perso.mybank.service.dto.OperationDTO;
import com.fr.perso.mybank.service.mapper.OperationMapper;


/**
 * Service Implementation for managing Operation.
 */
@Service
@Transactional
public class OperationServiceImpl implements OperationService {

    private final Logger log = LoggerFactory.getLogger(OperationServiceImpl.class);

    @Autowired
    private OperationRepository operationRepository;

    @Autowired
    private OperationMapper operationMapper;

    /**
     * Save an operation.
     *
     * @param operationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OperationDTO save(OperationDTO operationDTO) {
        log.debug("Request to save Operation : {}", operationDTO);
        Operation operation = operationMapper.toEntity(operationDTO);
        operation = operationRepository.save(operation);
        return operationMapper.toDto(operation);
    }

    /**
     * Get all the operations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OperationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Operations");
        return operationRepository.findAll(pageable)
            .map(operationMapper::toDto);
    }

    /**
     * Get one operation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OperationDTO findOne(Long id) {
        log.debug("Request to get Operation : {}", id);
        Operation operation = operationRepository.findOneWithEagerRelationships(id);
        return operationMapper.toDto(operation);
    }

    @Transactional(readOnly = true)
    public List<OperationDTO> findbetweenDate(String start, String end){
    	
    	LocalDate dStart = null, dEnd = null;
    	if( start != null ) {
				dStart = LocalDate.parse( start , DateTimeFormatter.ofPattern("dd/MM/yyyy") );
    	}
    	if( end != null ) {
				dEnd = LocalDate.parse( end , DateTimeFormatter.ofPattern("dd/MM/yyyy") );
    	}
    	if( dStart != null && dEnd != null ) {
    		List<Operation> ops = operationRepository.findBetweenDate(dStart, dEnd);
    		return operationMapper.toDto(ops);
    	}
    	return null;
    }
    
    /**
     * Delete the operation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Operation : {}", id);
        operationRepository.delete(id);
    }

	@Override
	public List<OperationDTO> findRegularFeesForCurrentMonth() {
		
		
		YearMonth yearMonth = YearMonth.of( LocalDate.now().getYear() , LocalDate.now().getMonth() ).minusMonths(1);
		LocalDate startDate = LocalDate.of( yearMonth.getYear() , yearMonth.getMonthValue() , LocalDate.now().getDayOfMonth() ); 
		LocalDate endDate = yearMonth.atEndOfMonth();
		
		log.debug("Find regular fees with date : start : " + startDate + " / end : " + endDate );
		List<Operation> ops = operationRepository.findRegularFeesForMonth( startDate , endDate );
		
		return operationMapper.toDto(ops);
	}
}
