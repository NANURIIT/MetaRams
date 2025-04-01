package com.nanuri.rams.business.assessment.tb07.tb07200;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07200S")
@RequiredArgsConstructor
@RestController
public class TB07200APIController {
    
    private final TB07200Service tb07200Service;

    @PostMapping("/selectSpcList")
    public List<IBIMS900BVO> selectSpcList(@RequestBody IBIMS900BVO param) {
        return tb07200Service.selectSpcList(param);
    }
    
}
