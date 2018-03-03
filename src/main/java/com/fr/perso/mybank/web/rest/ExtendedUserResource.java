package com.fr.perso.mybank.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fr.perso.mybank.service.ExtendedUserService;
import com.fr.perso.mybank.web.rest.errors.BadRequestAlertException;
import com.fr.perso.mybank.web.rest.util.HeaderUtil;
import com.fr.perso.mybank.service.dto.ExtendedUserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ExtendedUser.
 */
@RestController
@RequestMapping("/api")
public class ExtendedUserResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedUserResource.class);

    private static final String ENTITY_NAME = "extendedUser";

    private final ExtendedUserService extendedUserService;

    public ExtendedUserResource(ExtendedUserService extendedUserService) {
        this.extendedUserService = extendedUserService;
    }

    /**
     * POST  /extended-users : Create a new extendedUser.
     *
     * @param extendedUserDTO the extendedUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new extendedUserDTO, or with status 400 (Bad Request) if the extendedUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/extended-users")
    @Timed
    public ResponseEntity<ExtendedUserDTO> createExtendedUser(@RequestBody ExtendedUserDTO extendedUserDTO) throws URISyntaxException {
        log.debug("REST request to save ExtendedUser : {}", extendedUserDTO);
        if (extendedUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new extendedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExtendedUserDTO result = extendedUserService.save(extendedUserDTO);
        return ResponseEntity.created(new URI("/api/extended-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /extended-users : Updates an existing extendedUser.
     *
     * @param extendedUserDTO the extendedUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated extendedUserDTO,
     * or with status 400 (Bad Request) if the extendedUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the extendedUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/extended-users")
    @Timed
    public ResponseEntity<ExtendedUserDTO> updateExtendedUser(@RequestBody ExtendedUserDTO extendedUserDTO) throws URISyntaxException {
        log.debug("REST request to update ExtendedUser : {}", extendedUserDTO);
        if (extendedUserDTO.getId() == null) {
            return createExtendedUser(extendedUserDTO);
        }
        ExtendedUserDTO result = extendedUserService.save(extendedUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, extendedUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /extended-users : get all the extendedUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of extendedUsers in body
     */
    @GetMapping("/extended-users")
    @Timed
    public List<ExtendedUserDTO> getAllExtendedUsers() {
        log.debug("REST request to get all ExtendedUsers");
        return extendedUserService.findAll();
        }

    /**
     * GET  /extended-users/:id : get the "id" extendedUser.
     *
     * @param id the id of the extendedUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the extendedUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/extended-users/{id}")
    @Timed
    public ResponseEntity<ExtendedUserDTO> getExtendedUser(@PathVariable Long id) {
        log.debug("REST request to get ExtendedUser : {}", id);
        ExtendedUserDTO extendedUserDTO = extendedUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(extendedUserDTO));
    }

    /**
     * DELETE  /extended-users/:id : delete the "id" extendedUser.
     *
     * @param id the id of the extendedUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/extended-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteExtendedUser(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedUser : {}", id);
        extendedUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
