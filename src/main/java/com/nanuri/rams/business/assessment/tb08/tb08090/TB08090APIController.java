package com.nanuri.rams.business.assessment.tb08.tb08090;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.nanuri.rams.business.common.vo.IBIMS800BVO;
import com.nanuri.rams.business.common.vo.TB08090SVO;

import lombok.RequiredArgsConstructor;

@RequestMapping("/TB08090S")
@RequiredArgsConstructor
@RestController
public class TB08090APIController {

    private final TB08090Service tb08090Service;

    // 자본건전성 조회
	@GetMapping(value = "/getAsstSnnGrdList")
    public List<IBIMS800BVO> getAsstSnnGrdList(IBIMS800BVO param){
        return tb08090Service.getAsstSnnGrdList(param);
    }

    //자본건전성 저장
    @PostMapping(value = "/saveAsstSnnList")
    public int saveAsstSnnList(@RequestBody TB08090SVO param){
        return tb08090Service.saveAsstSnnList(param);
    }
    
}
