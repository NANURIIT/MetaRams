package com.nanuri.rams.business.common;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RamsLeftAPIController {

    private final RamsLeftService ramsLeftService;

    /**
     * 네비게이션 만들기
     */
    @PostMapping(value = "/createRamsNav")
    public List<IBIMS005BDTO> createRamsNav(@RequestBody String param) {
        return ramsLeftService.createRamsNav(param);
    }

}
