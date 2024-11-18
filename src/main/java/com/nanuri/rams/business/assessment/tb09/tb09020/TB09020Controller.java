package com.nanuri.rams.business.assessment.tb09.tb09020;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nanuri.rams.business.common.vo.IBIMS605BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * TB09020Controller
 */
@Slf4j
@RequestMapping("/TB09020S")
@RequiredArgsConstructor
@RestController
public class TB09020Controller {

    private final TB09020Service tb09020service;

    @GetMapping(value = "/getPacmList")
    public List<IBIMS605BVO> getPacmList(@RequestParam HashMap<String, Object> params){
        return tb09020service.getPacmList(params);
    }

    @PostMapping(value = "/save")
    public int save(@RequestParam HashMap<String, Object> params) {
        // 화면에서 보낸 parameter 넘어오는것 확인
        log.debug(params.toString());
        return tb09020service.save(params);
    }

    @PostMapping(value = "/updateRprStatus")
    public int updateRprStatus(@RequestParam HashMap<String, String> paramData) {
        // 화면에서 보낸 parameter 넘어오는것 확인
        log.debug(paramData.toString());
        return tb09020service.updateRprStatus(paramData);
    }

}

