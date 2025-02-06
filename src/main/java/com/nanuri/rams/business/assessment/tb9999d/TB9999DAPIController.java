package com.nanuri.rams.business.assessment.tb9999d;

import java.util.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9999D")
@RequiredArgsConstructor
@EnableScheduling
@RestController
public class TB9999DAPIController {

    private final TB9999DService tb9999dService;

    /**
     * 화면 내 시작조건버튼
     * @param date 날짜
     * @return
     */
    @PostMapping(value = "/start")
    public String tb9999d(@RequestBody String date) {
        // return tb9999dService.tb9999d(date);
        return "";
    };

}