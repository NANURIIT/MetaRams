package com.nanuri.rams.business.assessment.tt30.tt3020;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.TEST101BDTO;
import com.nanuri.rams.business.common.vo.TEST101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TT03020S")
@RequiredArgsConstructor
@RestController
public class TT03020APIController {

    private final TT03020Service tt03020Service;

    @GetMapping(value = "/getDealInfo")
    public TEST101BVO getDealInfo (TEST101BDTO test101bdto) {
        log.debug("컨트롤러 테스트 :: ", tt03020Service.getDealInfo(test101bdto));
        log.debug("test101bdto :: ", test101bdto);
        return tt03020Service.getDealInfo(test101bdto);
    }

    // 저장(insert)
    @PostMapping(value = "saveDealInfo")
    public String saveDealInfo(@RequestBody TEST101BDTO test101bdto) {
        //TODO: process POST request
        
        return tt03020Service.saveDealInfo(test101bdto);
    }
    
}
