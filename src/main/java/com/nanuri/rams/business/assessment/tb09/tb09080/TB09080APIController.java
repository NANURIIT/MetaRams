package com.nanuri.rams.business.assessment.tb09.tb09080;


import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("/TB09080S")
@RequiredArgsConstructor
@RestController
public class TB09080APIController {
	
	private final TB09080Service tb09080Svc;

	// 여신원장조회
	@PostMapping("/srchCrdlLdg")
	public IBIMS401BVO srchCrdlLdg(@RequestBody IBIMS401BVO input) {
		return tb09080Svc.srchCrdlLdg(input);
	}

	// 여신원장 실행순번 조회
	@PostMapping("/srchExcSn")
	public List<Map<String, Object>> srchCrdlLdgExcSn(@RequestBody IBIMS401BDTO input) {
		return tb09080Svc.srchExcSn(input);
	}
	
	// 거래내역 조회
	@PostMapping("/inqTrDtls")
	public IBIMS410BVO inqTrDtls(@RequestBody IBIMS410BVO input) {
		return tb09080Svc.inqTrDtls(input);
	}

	// 실행원장 조회
	@PostMapping("/inqExcLdg")
	public IBIMS402BVO inqExcLdg(@RequestBody IBIMS402BVO input) {
		return tb09080Svc.inqExcLdg(input);
	}
}
