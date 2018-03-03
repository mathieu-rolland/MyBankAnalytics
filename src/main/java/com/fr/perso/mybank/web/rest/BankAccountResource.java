package com.fr.perso.mybank.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fr.perso.mybank.domain.ParserType;
import com.fr.perso.mybank.service.BankAccountService;
import com.fr.perso.mybank.web.rest.errors.BadRequestAlertException;
import com.fr.perso.mybank.web.rest.util.HeaderUtil;
import com.fr.perso.mybank.web.rest.util.PaginationUtil;
import com.fr.perso.mybank.service.dto.BankAccountDTO;
import com.fr.perso.mybank.service.impl.FileStorageService;

import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BankAccount.
 */
@RestController
@RequestMapping("/api")
public class BankAccountResource {

    private final Logger log = LoggerFactory.getLogger(BankAccountResource.class);

    private static final String ENTITY_NAME = "bankAccount";

    private final BankAccountService bankAccountService;
    private final FileStorageService storageService;
    
    public BankAccountResource(BankAccountService bankAccountService , FileStorageService storageService) {
        this.bankAccountService = bankAccountService;
        this.storageService = storageService;
    }

    /**
     * POST  /bank-accounts : Create a new bankAccount.
     *
     * @param bankAccountDTO the bankAccountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bankAccountDTO, or with status 400 (Bad Request) if the bankAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bank-accounts")
    @Timed
    public ResponseEntity<BankAccountDTO> createBankAccount(@RequestBody BankAccountDTO bankAccountDTO) throws URISyntaxException {
        log.debug("REST request to save BankAccount : {}", bankAccountDTO);
        if (bankAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new bankAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BankAccountDTO result = bankAccountService.save(bankAccountDTO);
        return ResponseEntity.created(new URI("/api/bank-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bank-accounts : Updates an existing bankAccount.
     *
     * @param bankAccountDTO the bankAccountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bankAccountDTO,
     * or with status 400 (Bad Request) if the bankAccountDTO is not valid,
     * or with status 500 (Internal Server Error) if the bankAccountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bank-accounts")
    @Timed
    public ResponseEntity<BankAccountDTO> updateBankAccount(@RequestBody BankAccountDTO bankAccountDTO) throws URISyntaxException {
        log.debug("REST request to update BankAccount : {}", bankAccountDTO);
        if (bankAccountDTO.getId() == null) {
            return createBankAccount(bankAccountDTO);
        }
        BankAccountDTO result = bankAccountService.save(bankAccountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bankAccountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bank-accounts : get all the bankAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of bankAccounts in body
     */
    @GetMapping("/bank-accounts")
    @Timed
    public ResponseEntity<List<BankAccountDTO>> getAllBankAccounts(Pageable pageable) {
        log.debug("REST request to get a page of BankAccounts");
        Page<BankAccountDTO> page = bankAccountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/bank-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /bank-accounts/:id : get the "id" bankAccount.
     *
     * @param id the id of the bankAccountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bankAccountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bank-accounts/{id}")
    @Timed
    public ResponseEntity<BankAccountDTO> getBankAccount(@PathVariable Long id) {
        log.debug("REST request to get BankAccount : {}", id);
        BankAccountDTO bankAccountDTO = bankAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bankAccountDTO));
    }

    /**
     * DELETE  /bank-accounts/:id : delete the "id" bankAccount.
     *
     * @param id the id of the bankAccountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bank-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deleteBankAccount(@PathVariable Long id) {
        log.debug("REST request to delete BankAccount : {}", id);
        bankAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    @PostMapping("/bank-accounts/{id}/import")
    public ResponseEntity<String> importBankAccountOperation(@RequestParam("fileKey") MultipartFile file, @PathVariable Long id){
    	log.debug("Start on import " + (file != null ? file.getOriginalFilename() : "file is null"));
    	
    	
    	File result = storageService.storeFileInDownloadDirectory( file );
    	
        /*redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");
	*/
    	boolean importStatus = bankAccountService.importOperations( result , id);
    	
    	
        return ResponseEntity.ok().headers( HeaderUtil.createEntityUpdateAlert( ENTITY_NAME , importStatus + "") ).build();
    }
    
    @GetMapping("/bank-accounts/available_parsers")
    public ResponseEntity<List<ParserType>> getAllAvailableParser(){
    	return ResponseEntity.ok( bankAccountService.getAllAvailableParser() );
    }
    
}
