package com.nanuri.rams.business.assessment.tb07.tb07010;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07010SVO;
import com.nanuri.rams.com.dto.CalculationDTO;
import com.nanuri.rams.com.dto.CalculationResultDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07010S")
@RequiredArgsConstructor
@RestController
public class TB07010APIController {
	
	private final TB07010Service tb07010Service;

	// 기업여신정보 조회
	@PostMapping(value = "/getDetailInfo")
	public IBIMS401BVO getDetailInfo(@RequestBody IBIMS401BVO paramData) {
		return tb07010Service.getDetailInfo(paramData);
	}

	// 실행정보 저장
	@PostMapping(value = "/saveExcInfo")
	public int saveExcInfo(@RequestBody TB07010SVO tb7010svo) {
		log.debug("TB07010S :::::: {}", tb7010svo);

		return tb07010Service.saveExcInfo(tb7010svo);
	}

	// 이자 조회
	@PostMapping("/inqIntr")
	public CalculationResultDTO inqIntr(@RequestBody CalculationDTO input) {
		log.debug("\n:::::: /inqIntr ::: {}", input);
		
		return tb07010Service.inqIntr(input);
	}
	
}
