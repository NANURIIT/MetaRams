package com.nanuri.rams.business.assessment.tb9999d;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9999D")
@RequiredArgsConstructor
@RestController
public class TB9999DAPIController {

    private final TB9999DService tb9999dService;

    @PostMapping(value = "/start")
    public String tb9999d(@RequestBody String date) {
        return tb9999dService.tb9999d(date);
    };

}