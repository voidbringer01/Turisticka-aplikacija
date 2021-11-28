package com.example.turist.service;

import com.example.turist.entity.*;
import com.example.turist.repository.DrzavaRepository;
import com.example.turist.repository.ZnamenitostRepository;
import com.example.turist.util.SearchCriteria;
import com.example.turist.util.ZnamenitostSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ZnamenitostiService {
    @Autowired
    private DrzavaRepository drzavaRepository;
    @Autowired
    private ZnamenitostRepository znamenitostRepository;

    public List<Znamenitost> findZnamenitostiByDrzavaAndOpstina(int idDrzave, int idOpstine){
        Drzava d = this.drzavaRepository.findById(idDrzave).orElse(null);
        if(d!=null) {
            Opstina o = d.getOpstine().stream().filter(x -> x.getId() == idOpstine).findFirst().orElse(null);
            if (o != null) {
                return o.getZnamenitosti();
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
        return list;
    }

    public int getProsekOcena(int id) {
        return znamenitostRepository.findAverageOcena(id);
    }

    public int getOcena(int idZnamenitosti, String idKorisnika) {
        Znamenitost z = this.znamenitostRepository.findById(idZnamenitosti).orElse(null);
        List<Ocena> ocene = z.getOcene();
        Ocena o = ocene.stream().filter(x -> x.getPotpis().equals(idKorisnika)).findFirst().orElse(null);

        if(o == null)
            return 0;
        else return
            o.getOcena();
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
}
