package com.nanuri.rams.business.assessment.tb06.tb06070;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS200BDTO;
import com.nanuri.rams.business.common.vo.TB06070SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06070S")
@RequiredArgsConstructor
@RestController
public class TB06070APIController {

	private final TB06070Service tb06070service;

	/**
	 * 상품정보 팝업 조회
	 */
    @PostMapping(value = "/getResultData")
    public List<IBIMS200BDTO> getResultData(@RequestBody TB06070SVO param) {
        return tb06070service.getResultData(param);
    }
    
	/**
	 * 상품정보 상세 조회
	 */
    @PostMapping(value = "/getDetailInfo")
	public TB06070SVO getDetailInfo(@RequestBody TB06070SVO param) {
    	System.out.println(param);
		return tb06070service.getDetailInfo(param);
	}
}
