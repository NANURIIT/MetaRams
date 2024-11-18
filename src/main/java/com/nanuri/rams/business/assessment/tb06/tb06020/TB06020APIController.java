package com.nanuri.rams.business.assessment.tb06.tb06020;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06020S")
@RequiredArgsConstructor
@RestController
public class TB06020APIController {

	private final TB06020Service tb06020Service;
	
	// 대출계약 승인정보관리 조회
	@GetMapping(value = "/getCnfrncDealInfo")
	public TB06010SVO getCnfrncDealInfo(TB06010SVO param) {
		return tb06020Service.getCnfrncDealInfo(param);
	}

	// 종목정보 등록
	@PostMapping(value = "/regPrdtCd")
	public int regPrdtCd(IBIMS201BVO param) {
		return tb06020Service.regPrdtCd(param);
	}
	
	// 종목정보 삭제
	@PostMapping(value = "/deletePrdtCd")
	public int deletePrdtCd(@RequestBody IBIMS201BVO param) {
		return tb06020Service.deletePrdtCd(param);
	}

}
