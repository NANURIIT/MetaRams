package com.nanuri.rams.business.assessment.tb06.tb06014;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS222BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06014P")
@RequiredArgsConstructor
@RestController
public class TB06014APIController {

	private final TB06014Service tb06014Service;

	// 기초자산리스트 조회
	@GetMapping(value = "/getBaseAsst")
	public List<IBIMS222BVO> getBaseAsst(IBIMS222BVO param) {
		return tb06014Service.getBaseAsst(param);
	}

	// 기초자산리스트 등록
	@PostMapping(value = "/rgstAsst")
	public int rgstAsst(IBIMS222BVO searchParam) {
		return tb06014Service.rgstAsst(searchParam);
	}

	// 기초자산리스트 수정
	@PostMapping(value = "/mdfAsst")
	public int mdfAsst(IBIMS222BVO searchParam) {
		return tb06014Service.mdfAsst(searchParam);
	}

}
