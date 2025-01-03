package com.nanuri.rams.business.assessment.tb90.tb9990;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS810BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9990B")
@RequiredArgsConstructor
@RestController
public class TB9990APIController {

        private final TB9990Service tb9990Service;

        @PostMapping(value = "/insert")
        public int insert(@RequestBody IBIMS997BDTO param) {
                return tb9990Service.insert(param);
        }

}
