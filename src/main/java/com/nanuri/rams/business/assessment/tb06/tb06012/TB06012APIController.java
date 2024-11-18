package com.nanuri.rams.business.assessment.tb06.tb06012;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS208BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06012P")
@RequiredArgsConstructor
@RestController
public class TB06012APIController {

	private final TB06012Service tb06012Service;

	// 상품코드 리스트 등록
	@PostMapping(value = "/delAppvCndtList")
	public int delAppvCndtList(IBIMS208BDTO delParam) {
		return tb06012Service.delAppvCndtList(delParam);
	}
}
