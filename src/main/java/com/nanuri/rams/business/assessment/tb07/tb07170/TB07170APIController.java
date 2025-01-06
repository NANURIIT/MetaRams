package com.nanuri.rams.business.assessment.tb07.tb07170;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07170S")
@RequiredArgsConstructor
@RestController
public class TB07170APIController {

    private final TB07170Service tb07170Service;

    @PostMapping(value="/getDptrDtlsList")
    public List<IBIMS430BVO> getDptrDtlsList(@RequestBody IBIMS430BDTO param){
        return tb07170Service.getDptrDtlsList(param);
    }
    
}
