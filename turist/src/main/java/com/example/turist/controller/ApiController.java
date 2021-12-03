package com.example.turist.controller;

import com.example.turist.dto.ResponseMessage;
import com.example.turist.entity.Drzava;
import com.example.turist.entity.Ocena;
import com.example.turist.entity.Znamenitost;
import com.example.turist.service.DrzavaService;
import com.example.turist.service.FileStorageService;
import com.example.turist.service.ZnamenitostiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(path="api")
public class ApiController {
    @Autowired
    private DrzavaService drzavaService;

    @Autowired
    private ZnamenitostiService znamenitostiService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/drzave")
    public List<Drzava> findAllDrzave(){
        return drzavaService.getDrzave();
    }



    @GetMapping("/znamenitosti/{idDrzave}/{idOpstine}")
    public List<Znamenitost> getZnamenitostiByDrzavaAndOpstina(@PathVariable int idDrzave,@PathVariable int idOpstine){
        return znamenitostiService.findZnamenitostiByDrzavaAndOpstina(idDrzave,idOpstine)   ;
    }

    @GetMapping("/znamenitost/{id}")
    public Znamenitost getZnamenitostById(@PathVariable int id){
        return znamenitostiService.findById(id);
    }

    @GetMapping("/znamenitosti/{name}")
    public List<Znamenitost> getZnamenitostiByName(@PathVariable String name){
        return znamenitostiService.searchZnamenitostiByName(name);
    }

    @GetMapping("/prosecnaocena/{id}")
    public int getProsecnaOcena(@PathVariable int id){
        return znamenitostiService.getProsekOcena(id);
    }

    @GetMapping("/ocena/{idZnamenitosti}/{idKorisnika}")
    public Ocena getTrenutnaOcena(@PathVariable int idZnamenitosti, @PathVariable String idKorisnika){
        return znamenitostiService.getOcena(idZnamenitosti,idKorisnika);
    }

    @PostMapping("/ocena/{id}")
    public Ocena addOcena(@PathVariable int id,@RequestBody Ocena ocena){
        return znamenitostiService.addOcena(ocena,id);
    }

    @PutMapping("/ocena/{id}")
    public Ocena editOcena(@PathVariable int id,@RequestBody Ocena ocena){
        return znamenitostiService.editOcena(ocena,id);
    }

    @GetMapping("/znamenitosti/page/{num}")
    public List<Znamenitost> getAllZnamenitosti(@PathVariable int num){
        return znamenitostiService.getAllZnamenitosti(num);
    }

    @PostMapping("/znamenitosti/{idDrzave}/{idOpstine}")
    public Znamenitost addZnamenitost(@RequestBody Znamenitost znamenitost, @PathVariable int idDrzave,@PathVariable int idOpstine){
        return znamenitostiService.addZnamenitost(znamenitost,idDrzave,idOpstine);
    }

    @PutMapping("/znamenitosti")
    public ResponseEntity<?> editZnamenitosti(@RequestBody Znamenitost znamenitost){
        return znamenitostiService.editZnamenitost(znamenitost);
    }

    @PutMapping("/promeni-aktivnost/{id}")
    public ResponseEntity<?> promeniAktivnost(@PathVariable int id){
        return znamenitostiService.promeniAktivnost(id);
    }
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            fileStorageService.save(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }
    }
    @GetMapping("/count-znamenitosti")
    public long getCountZnamenitosti(){
        return this.znamenitostiService.countZnamenitosti();
    }


}
