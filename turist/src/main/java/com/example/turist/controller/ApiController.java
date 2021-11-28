package com.example.turist.controller;

import com.example.turist.dto.DrzavaResponse;
import com.example.turist.entity.Drzava;
import com.example.turist.entity.Ocena;
import com.example.turist.entity.Znamenitost;
import com.example.turist.service.DrzavaService;
import com.example.turist.service.ZnamenitostiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api")
public class ApiController {
    @Autowired
    private DrzavaService drzavaService;

    @Autowired
    private ZnamenitostiService znamenitostiService;

    @GetMapping("/drzave")
    public List<Drzava> findAllDrzave(){
        return drzavaService.getDrzave();
    }

//    @PostMapping("/drzave")
//    public Drzava addDrzava(@RequestBody Drzava drzava){
//        return drzavaService.createDrzava(drzava);
//    }

    @GetMapping("/znamenitosti/{idDrzave}/{idOpstine}")
    public List<Znamenitost> getZnamenitostiByDrzavaAndOpstina(@PathVariable int idDrzave,@PathVariable int idOpstine){
        return znamenitostiService.findZnamenitostiByDrzavaAndOpstina(idDrzave,idOpstine)   ;
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
    public int getTrenutnaOcena(@PathVariable int idZnamenitosti, @PathVariable String idKorisnika){
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
}
