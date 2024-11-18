package com.nanuri.rams.business.assessment.tb07.tb07050;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.TB06040SVO;
import com.nanuri.rams.business.common.vo.TB07050SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("/TB07050S")
@RequiredArgsConstructor
@RestController
public class TB07050APIController {

    private final TB07050Service tb07050svc;

    // 원리금 스케줄관리 조회
    @PostMapping("/getPrnaRdmpSch")
    public TB06040SVO getPrnaRdmpSch(@RequestBody IBIMS403BDTO input) {
        log.debug("/getPrnaRdmpSch ::: IBIMS403BDTO input :::::: {}", input);

        return tb07050svc.getPrnaRdmpSch(input);
    }

    // 원리금 스케줄관리 실행
    @PostMapping("/savePrnaRdmpSch")
    public int savePrnaRdmpSch(@RequestBody TB07050SVO input) {
        return tb07050svc.savePrnaRdmpSch(input);
    }
    
    // 원리금 스케줄관리 실행일련번호 조회
    @PostMapping("/srchExcSn")
    public List<Map<String, Object>> srchExcSn(@RequestBody IBIMS403BDTO input) {
        return tb07050svc.srchExcSn(input);
    }
    
}