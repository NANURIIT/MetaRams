package com.nanuri.rams.business.assessment.tb90.tb9050;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9050B")
@RequiredArgsConstructor
@RestController
public class TB9050APIController {

    private final TB9050Service tb9050Service;

    @PostMapping(value = "/insert")
    public String insert(@RequestBody IBIMS997BDTO param) {
        return tb9050Service.insert(param);
    }

}
