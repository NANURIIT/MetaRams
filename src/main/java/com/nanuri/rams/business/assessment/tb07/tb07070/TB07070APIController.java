package com.nanuri.rams.business.assessment.tb07.tb07070;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.TB07070SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07070S")
@RequiredArgsConstructor
@RestController
public class TB07070APIController {
	
	private final TB07070Service tb07070Service;

	// 이후 거래 존재여부 확인 
	@PostMapping(value = "/selectAfChkTrsnIBIMS410B")
	public int selectAfChkTrsnIBIMS410B(@RequestBody IBIMS410BDTO param) {
		return tb07070Service.selectAfChkTrsnIBIMS410B(param);
	}

	// 정정거래조회
	@PostMapping(value = "/selectTrRvseInq")
	public List<IBIMS410BVO> selectRvseTrInq(@RequestBody TB07070SVO param) {
		return tb07070Service.selectRvseTrInq(param);
	}

	// 정정거래 실행
	@PostMapping(value = "/saveTrRvseInq")
	public int saveTrRvseInq(@RequestBody TB07070SVO param) { 
		return tb07070Service.saveTrRvseInq(param);
    }	
}
