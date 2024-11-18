package com.nanuri.rams.business.dashboard.ds01010;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.DS01010SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/DS01010S")
@RequiredArgsConstructor
@RestController
public class DS01010APIController {
	
	private final DS01010Service ds01010Service;

	// 협의체 부의 현황_공통
	@GetMapping(value = "/getTable1")
	public List<Map<String, Object>> getTable1(DS01010SVO.inqueryParameters param) {
		log.debug("DS01010 협의체 부의현황 ==> : " + param);
		return ds01010Service.getTable1(param);
	}
	
	// 협의체 결과 현황_공통
	@GetMapping(value = "/getTable2")
	public List<Map<String, Object>> getTable2(DS01010SVO.inqueryParameters param) {
		log.debug("DS01010 협의체 결과현황 ==> : " + param);
		return ds01010Service.getTable2(param);
	}
	
	// 투자자산현황 기표전
	@GetMapping(value = "/getTable3")
	public List<Map<String, Object>> getTable3(DS01010SVO.inqueryParameters param) {
		log.debug("DS01010 투자자산 기표전 ==> : " + param);
		return ds01010Service.getTable3(param);
	}
	
	// 투자자산현황 기표후
	@GetMapping(value = "/getTable4")
	public List<Map<String, Object>> getTable4(DS01010SVO.inqueryParameters param) {
		log.debug("DS01010 투자자산 기표후 ==> : " + param);
		return ds01010Service.getTable4(param);
	}
	// 투자자산현황 투자규모 및 추이
	@GetMapping(value = "/getTable5")
	public List<Map<String, Object>> getTable5(DS01010SVO.inqueryParameters param) {
		log.debug("DS01010 투자규모 및 추이 ==> : " + param);
		return ds01010Service.getTable5(param);
	}

}
