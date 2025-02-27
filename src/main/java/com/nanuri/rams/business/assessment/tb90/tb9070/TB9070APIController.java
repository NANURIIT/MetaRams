package com.nanuri.rams.business.assessment.tb90.tb9070;

import org.springframework.web.bind.annotation.*;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/TB9070B")
@RequiredArgsConstructor
public class TB9070APIController {

    private final TB9070Service tb9070Service;

    @PostMapping("/execute")
    public String insert(@RequestBody IBIMS997BDTO param) {        
        return tb9070Service.insert(param);
     }
}
