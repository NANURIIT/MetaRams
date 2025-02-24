package com.nanuri.rams.business.assessment.tb90.tb9000;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9000B")
@RequiredArgsConstructor
@RestController
public class TB9000APIController {

        private final TB9000Service tb9000Service;

        @PostMapping(value = "/insert")
        public String insert(@RequestBody IBIMS997BDTO param) {
                return tb9000Service.insertIBIMS810B(param);
        }

}
