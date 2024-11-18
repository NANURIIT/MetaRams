package com.nanuri.rams.business.assessment.tb90.tb9060;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestParam;


@Slf4j
@RequestMapping("/TB9060B")
@RequiredArgsConstructor
@RestController
public class TB9060APIController {

        private final TB9060Service tb9060Service;

        @PostMapping(value = "/insert")
        public int insert(@RequestBody IBIMS997BDTO param) {
                return tb9060Service.insert(param);
        }
        
}
