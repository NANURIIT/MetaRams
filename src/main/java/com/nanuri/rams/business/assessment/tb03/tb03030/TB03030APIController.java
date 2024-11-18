package com.nanuri.rams.business.assessment.tb03.tb03030;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB03030S")
@RequiredArgsConstructor
@RestController
public class TB03030APIController {
	
	private final TB03030Service tb03030Service;
	
	// 기업등록
	@PostMapping(value = "/registRmInfo")
	public int registRmInfo(IBIMS102BDTO registInfo) {
		return tb03030Service.registRmInfo(registInfo);
	}
	
	// RM이름조회
	@GetMapping(value = "/getEntpInfoByNm")
	public List<IBIMS102BDTO> getEntpInfoByNm(IBIMS102BDTO entpInfoNm) {
		return tb03030Service.getEntpInfoByNm(entpInfoNm);
	}
	
	// RM활동조회
	@GetMapping(value = "/getHistoryInfo")
	public List<IBIMS102BDTO> getHistoryInfo(IBIMS102BDTO rmInfo) {
		return tb03030Service.getHistoryInfo(rmInfo);
	}
	
	// RM활동이력조회
	@GetMapping(value = "/rmHistoryInfo")
	public List<IBIMS102BDTO> rmHistoryInfo(IBIMS102BDTO rmHistoryInfo) {
		return tb03030Service.rmHistoryInfo(rmHistoryInfo);
	}
	
	// RM활동수정
	@PostMapping(value = "/updateHistory")
	public int updateRmInfo(@RequestBody IBIMS102BDTO registInfo) {
		return tb03030Service.updateHistory(registInfo);
	}
	
	// File Upload Key
	@GetMapping(value = "/getFileKey")
	public List<IBIMS102BDTO> getFileKey(IBIMS102BDTO rmHistoryInfo) {
		return tb03030Service.getFileKey(rmHistoryInfo);
	}
}
