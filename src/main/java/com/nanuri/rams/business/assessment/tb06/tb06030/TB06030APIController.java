package com.nanuri.rams.business.assessment.tb06.tb06030;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.business.common.dto.IBIMS250BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06030S")
@RequiredArgsConstructor
@RestController
public class TB06030APIController {

	private final TB06030Service tb06030Service;

	// 대출계약 승인정보관리 조회
	@GetMapping(value = "/getCnfrncDealInfo")
	public TB06010SVO getCnfrncDealInfo(TB06010SVO param) {
		return tb06030Service.getCnfrncDealInfo(param);
	}

	// 종목정보 등록
	@PostMapping(value = "/regPrdtCd")
	public int regPrdtCd(@RequestBody IBIMS201BVO param) {
		System.out.println();
		return tb06030Service.regPrdtCd(param);
	}

// 종목정보 등록
@PostMapping(value = "/registFinc")
public int registFinc(@RequestBody IBIMS250BDTO param) {
	System.out.println();
	return tb06030Service.registFinc(param);
}


	
	
	// 종목정보 삭제
	@PostMapping(value = "/deletePrdtCd")
	public int deletePrdtCd(@RequestBody IBIMS201BVO param) {
		return tb06030Service.deletePrdtCd(param);
	}
}
