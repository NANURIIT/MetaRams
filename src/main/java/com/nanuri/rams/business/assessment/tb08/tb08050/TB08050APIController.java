package com.nanuri.rams.business.assessment.tb08.tb08050;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS420BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB08050S")
@RequiredArgsConstructor
@RestController
public class TB08050APIController {

	private final TB08050Service tb08050Service;

	// 수수료내역 조회
	@PostMapping("/selectFeeRcivLst")
	public List<IBIMS420BVO> selectFeeRcivLst(IBIMS420BVO input) {
		return tb08050Service.selectFeeRcivLst(input);
	}


	// 수수료수납정보 저장
	@PostMapping(value = "/saveFeeRcivInfo")
	public int saveExcInfo(@RequestBody IBIMS420BVO paramData) {
		return tb08050Service.saveExcInfo(paramData);
	}
	
}
