package com.nanuri.rams.business.assessment.tb06.tb06080;

import org.slf4j.Logger;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB06080SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06080S")
@RequiredArgsConstructor
@RestController
public class TB06080APIController {

	private final TB06080Service tb06080Service;
	
	// 결재내역 조회
	@PostMapping(value = "inqTB06080S")
	public TB06080SVO inqTB06080S(@RequestBody TB06080SVO input) {
		
		Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());
		
		logger.debug(input.getDecdStepDcd());
		
		TB06080SVO returnVo = new TB06080SVO();
				
		returnVo.setApvlList(tb06080Service.inqTB06080S(input).getApvlList());
		returnVo.setGbckList(tb06080Service.inqTB06080S(input).getGbckList());
		
		return returnVo;
	}
	
}
