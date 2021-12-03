package com.example.turist.service;

import com.example.turist.entity.*;
import com.example.turist.repository.DrzavaRepository;
import com.example.turist.repository.OpstinaRepository;
import com.example.turist.repository.ZnamenitostRepository;
import com.example.turist.util.SearchCriteria;
import com.example.turist.util.ZnamenitostSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ZnamenitostiService {
    @Autowired
    private DrzavaRepository drzavaRepository;
    @Autowired
    private ZnamenitostRepository znamenitostRepository;
    @Autowired
    private OpstinaRepository opstinaRepository;

    public List<Znamenitost> findZnamenitostiByDrzavaAndOpstina(int idDrzave, int idOpstine){
        Drzava d = this.drzavaRepository.findById(idDrzave).orElse(null);
        if(d!=null) {
            Opstina o = d.getOpstine().stream().filter(x -> x.getId() == idOpstine).findFirst().orElse(null);
            if (o != null) {
                return o.getZnamenitosti().stream().filter(x->x.isAktivna()==true).collect(Collectors.toList());
            }
            else
                return null;
        }else{
            return null;
        }
    }

    public List<Znamenitost> searchZnamenitostiByName(String naziv  ) {
        ZnamenitostSpecification spec = new ZnamenitostSpecification(new SearchCriteria("naziv",":",naziv));
        List<Znamenitost> list = znamenitostRepository.findAll(spec);
        return list.stream().filter(x->x.isAktivna()==true).collect(Collectors.toList());
    }

    public int getProsekOcena(int id) {
        return znamenitostRepository.findAverageOcena(id);
    }

    public Ocena getOcena(int idZnamenitosti, String idKorisnika) {
        Znamenitost z = this.znamenitostRepository.findById(idZnamenitosti).orElse(null);
        List<Ocena> ocene = z.getOcene();
        Ocena o = ocene.stream().filter(x -> x.getPotpis().equals(idKorisnika)).findFirst().orElse(null);

        if(o == null)
            return null;
        else return
            o;
    }

    public Ocena addOcena(Ocena ocena, int id) {
        Znamenitost z = this.znamenitostRepository.findById(id).orElse(null);
        if(z== null)
            return null;
        else {
            z.getOcene().add(ocena);
            this.znamenitostRepository.save(z);
            return ocena;
        }
    }

    public Ocena editOcena(Ocena ocena, int id) {
        Znamenitost z = this.znamenitostRepository.findById(id).orElse(null);
        if(z== null)
            return null;
        else {
            List<Ocena> s = z.getOcene();
            for(int i=0;i<s.size();i++){
                if(s.get(i).getPotpis().equals(ocena.getPotpis()))
                    z.getOcene().get(i).setOcena(ocena.getOcena());
            }
            this.znamenitostRepository.save(z);
            return ocena;
        }
    }

    public Znamenitost findById(int id) {
        Znamenitost z = this.znamenitostRepository.findById(id).orElse(null);
        if(z!=null && z.isAktivna())
            return z;
        else
            return null;
    }

    public List<Znamenitost> getAllZnamenitosti(int num) {
        Pageable p  = PageRequest.of(num-1,5, Sort.by("id"));
        return this.znamenitostRepository.findAll(p).toList();
    }

    public Znamenitost addZnamenitost(Znamenitost znamenitost, int idDrzave, int idOpstine) {
        Znamenitost z = this.znamenitostRepository.findById(znamenitost.getId()).orElse(null);

        if(z != null) {
            String message = "Znamenitost already exists.";
//            return ResponseEntity.status(302).body(message)
            return null;
        }
        else{
            Drzava d = this.drzavaRepository.findById(idDrzave).orElse(null);
            if(d!=null) {
                Opstina o = d.getOpstine().stream().filter(x -> x.getId() == idOpstine).findFirst().orElse(null);
                if (o != null) {
                    List<String> ls = znamenitost.getSlike();
                    for(int i = 0;i<ls.size();i++){
                        ls.set(i, "uploads/"+ls.get(i));
                    }
                    znamenitost.setSlike(ls);
                    o.getZnamenitosti().add(znamenitost);
                    this.opstinaRepository.save(o);
                    String message = "Znamenitost uspesno kreirana.";
//                    return ResponseEntity.status(201).body(message);
                    return znamenitost;
                }
                else {
                    String message = "Greska u pronalazenju opstine.";
//                    return ResponseEntity.badRequest().body(message);
                    return null;
                }
            }
            else{
                String message = "Greska u pronalazenju drzave";
//                return ResponseEntity.badRequest().body(message);
                return null;
            }

        }

    }

    public ResponseEntity<?> editZnamenitost(Znamenitost znamenitost) {
        Znamenitost z = this.znamenitostRepository.findById(znamenitost.getId()).orElse(null);
        if(z == null){
            String message = "Znamenitost nije pronadjena";
            return ResponseEntity.status(400).body(message);
        }else{
            z.setSlike(znamenitost.getSlike());
            z.setOcene(znamenitost.getOcene());
            z.setVaznost(znamenitost.getVaznost());
            z.setOpis(znamenitost.getOpis());
            z.setNaziv(znamenitost.getNaziv());
            z.setKoordinate(znamenitost.getKoordinate());
            this.znamenitostRepository.save(z);
            String message = "Znamenitost uspesno izmenjena.";
            return ResponseEntity.status(204).body(message);
        }
    }

    public ResponseEntity<?> promeniAktivnost(int id) {
        Znamenitost z = this.znamenitostRepository.findById(id).orElse(null);
        if(z== null){
            String message = "Znamenitost nije pronadjena";
            return ResponseEntity.status(400).body(message);
        }else{
            z.setAktivna(!z.isAktivna());
            this.znamenitostRepository.save(z);
            String message = "AKtivnost znamenitosti izmenjena.";
            return ResponseEntity.status(204).body(message);
        }
    }

    public long countZnamenitosti() {
        return this.znamenitostRepository.count();
    }
}
