package com.example.turist.service;

import com.example.turist.dto.DrzavaResponse;
import com.example.turist.entity.Drzava;
import com.example.turist.repository.DrzavaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DrzavaService {
    @Autowired
    private DrzavaRepository repository;

    public List<Drzava> getDrzave() {
//        List<Drzava> drzave = repository.findAll();
//        List<DrzavaResponse> drzaveToSend = new ArrayList<DrzavaResponse>();
//        drzave.forEach(drzava -> {
//            DrzavaResponse dr = new DrzavaResponse(drzava.getId(),drzava.getNazivDrzave());
//            drzaveToSend.add(dr);
//        });
//
//        return drzaveToSend;

        return repository.findAll();
    }

    public Drzava createDrzava(Drzava drzava){
        return repository.save(drzava);
    }
}
