package com.nanuri.rams.business.assessment.tb90.tb9990;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9990B")
@RequiredArgsConstructor
@RestController
@EnableScheduling
public class TB9990APIController {

        private final TB9990Service tb9990Service;

        @PostMapping(value = "/insert")
        public String insert(@RequestBody IBIMS997BDTO param) {
                return tb9990Service.insert(param);
        }

}
