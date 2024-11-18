package com.nanuri.rams.business.assessment.mo44.mo44020S;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nanuri.rams.business.common.vo.MO44020SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * MO44020Controller
 */
@Slf4j
@RequestMapping("/MO44020S")
@RequiredArgsConstructor
@RestController
public class MO44020Controller {

    private final MO44020Service mo44020service;

    @GetMapping(value = "/getPacmList")
    public List<MO44020SVO> getPacmList(@RequestParam HashMap<String, Object> params){
        return mo44020service.getPacmList(params);
    }

    @PostMapping(value = "/save")
    public int save(@RequestParam HashMap<String, Object> params) {
        // 화면에서 보낸 parameter 넘어오는것 확인
        log.debug(params.toString());
        return mo44020service.save(params);
    }

    @PostMapping(value = "/updateRprStatus")
    public int updateRprStatus(@RequestParam HashMap<String, String> paramData) {
        // 화면에서 보낸 parameter 넘어오는것 확인
        log.debug(paramData.toString());
        return mo44020service.updateRprStatus(paramData);
    }

}