package com.example.turist.dto;

import com.example.turist.entity.Drzava;
import com.example.turist.entity.Opstina;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiZahtev {
    private Drzava drzava;
    private Opstina opstina;
}
