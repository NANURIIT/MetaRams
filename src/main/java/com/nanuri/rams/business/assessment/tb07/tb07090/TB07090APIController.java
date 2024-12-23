package com.nanuri.rams.business.assessment.tb07.tb07090;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.dto.IBIMS435BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.vo.IBIMS435BVO;
import com.nanuri.rams.business.common.vo.TB07090SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07090S")
@RequiredArgsConstructor
@RestController
public class TB07090APIController {
    
    private final TB07090Service tb07090Service;

    @PostMapping(value = "/getDprtDtlsInfo")
    public TB07090SVO getDprtDtlsInfo(@RequestBody IBIMS430BVO param){
        return tb07090Service.getDprtDtlsInfo(param);
    }

    // 입금증등록내역 저★장☆
    @PostMapping(value="/rctmDtlsRgst")
    public int rctmDtlsRgst(@RequestBody IBIMS435BVO param){
        return tb07090Service.rctmDtlsRgst(param);
    }

    // 입금내역매핑 저★장☆
    @PostMapping(value="/rctmDtlsMapping")
    public int rctmDtlsMapping(@RequestBody IBIMS430BVO param){
        return tb07090Service.rctmDtlsMapping(param);
    }
    
}
