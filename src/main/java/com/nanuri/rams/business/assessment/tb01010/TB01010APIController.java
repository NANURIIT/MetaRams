package com.nanuri.rams.business.assessment.tb01010;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB01010SVO.inqueryParameters;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB01010S")
@RequiredArgsConstructor
@RestController
public class TB01010APIController {
	
	private final TB01010Service tb01010Service;

	// 협의체 부의 현황_공통
	@GetMapping(value = "/selectCnfStts")
	public List<IBIMS103BVO> selectCnfStts(IBIMS103BVO param) {
		log.debug("심사부 대시보드 협의체 부의현황 ==> : " + param);
		return tb01010Service.selectCnfStts(param);
	}
	
	// 협의체 결과 현황_공통
	@GetMapping(value = "/selectCnfRslt")
	public List<IBIMS103BVO> selectCnfRslt(IBIMS103BVO param) {
		log.debug("심사부 대시보드 협의체 결과현황 ==> : " + param);
		return tb01010Service.selectCnfRslt(param);
	}
	
	// 투자자산현황 기표전
	@GetMapping(value = "/selectSttsInvsAstsBfSgnf")
	public List<IBIMS103BVO> selectSttsInvsAstsBfSgnf(IBIMS103BVO param) {
		log.debug("심사부 대시보드 투자자산 기표전 ==> : " + param);
		return tb01010Service.selectSttsInvsAstsBfSgnf(param);
	}
	
	// 투자자산현황 기표후
	@GetMapping(value = "/selectSttsInvsAstsAfSgnf")
	public List<IBIMS103BVO> selectSttsInvsAstsAfSgnf(IBIMS103BVO param) {
		log.debug("심사부 대시보드 투자자산 기표후 ==> : " + param);
		return tb01010Service.selectSttsInvsAstsAfSgnf(param);
	}
	// 투자자산현황 투자규모 및 추이
	@GetMapping(value = "/getTable5")
	public List<Map<String, Object>> getTable5(inqueryParameters param) {
		log.debug("심사부 대시보드 투자규모 및 추이 ==> : " + param);
		return tb01010Service.getTable5(param);
	}

}
