package com.fr.perso.mybank.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.fr.perso.mybank.service.AutoAffectParameterService;
import com.fr.perso.mybank.service.dto.AutoAffectParameterDTO;
import com.fr.perso.mybank.service.dto.BankAccountDTO;
import com.fr.perso.mybank.web.rest.errors.BadRequestAlertException;
import com.fr.perso.mybank.web.rest.util.HeaderUtil;
import com.fr.perso.mybank.web.rest.util.PaginationUtil;

@RestController
@RequestMapping("/api")
public class AutoAffectParameterResource {

	private Logger log = LoggerFactory.getLogger( AutoAffectParameterResource.class );

    private static final String ENTITY_NAME = "AutoAffectParameter";
    
    @Autowired
    private AutoAffectParameterService autoAffectParamService;
    
	@PostMapping("/autoaffectparameter")
	@Timed
	public ResponseEntity<AutoAffectParameterDTO> createAutoAffectParameters(@RequestBody AutoAffectParameterDTO param){
		log.debug( "Start to save AutoAffectParameter {} ", param );
		
		if ( param.getId() != null) {
            throw new BadRequestAlertException("A new extendedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
		
		AutoAffectParameterDTO result = autoAffectParamService.save(param);
		return ResponseEntity.ok( result );
	}
	
	@DeleteMapping("/autoaffectparameter/{id}")
	@Timed
	public ResponseEntity<AutoAffectParameterDTO> deleteAutoAffectParameters(@PathVariable Long id){
		log.debug( "Start to delete AutoAffectParameter {} ", id );
		autoAffectParamService.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
	
	@GetMapping("/autoaffectparameter/all")
    @Timed
    public ResponseEntity<List<AutoAffectParameterDTO>> getAllAutoAffectParameters(Pageable pageable) {
        log.debug("REST request to get a page of BankAccounts");
        Page<AutoAffectParameterDTO> page = autoAffectParamService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bank-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
	
	@PutMapping("/autoaffectparameter")
	@Timed
	public ResponseEntity<AutoAffectParameterDTO> updateAutoAffectParameters(@RequestBody AutoAffectParameterDTO param){
		log.debug( "Start to update AutoAffectParameter {} ", param );
		
		if ( param.getId() != null) {
            throw new BadRequestAlertException("A new extendedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
		
		AutoAffectParameterDTO result = autoAffectParamService.save(param);
		return ResponseEntity.ok( result );
	}
	
	@GetMapping("/autoaffectparameter/{id}")
	@Timed
	public ResponseEntity<AutoAffectParameterDTO> findAutoAffectParameters(@PathVariable Long id){
		log.debug( "Start to find AutoAffectParameter with id {} ", id );
		AutoAffectParameterDTO result = autoAffectParamService.find(id);
		return ResponseEntity.ok( result );
	}
	
}
