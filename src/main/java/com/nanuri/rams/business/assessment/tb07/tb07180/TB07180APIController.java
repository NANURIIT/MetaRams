package com.nanuri.rams.business.assessment.tb07.tb07180;


import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS421BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07180S")
@RequiredArgsConstructor
@RestController
public class TB07180APIController {
	
	private final TB07180Service tb07180Service;

	@GetMapping(value = "/IBIMS421BSelect")
	public List<IBIMS421BDTO> IBIMS421BSelect(String feeName) {
		return tb07180Service.IBIMS421BSelect(feeName);
	}
	
	@PostMapping(value = "/IBIMS421BInsert")
	public int IBIMS421BInsert(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BInsert(param);
	};

	@PostMapping(value = "/IBIMS421BUpdate")
	public int IBIMS421BUpdate(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BUpdate(param);
	};
	
	@PostMapping(value = "/IBIMS421BSave")
	public int IBIMS421BSave(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BSave(param);
	};

	@PostMapping(value = "/IBIMS421BDelete")
	public int IBIMS421BDelete(@RequestBody IBIMS421BDTO param){
		return tb07180Service.IBIMS421BDelete(param);
	};
	
	// 공통코드
	@GetMapping(value = "/getSelectBoxCode")
	public List<Map<String, Object>> getSelectBoxCode() {
		return tb07180Service.getSelectBox();
	}
	
}
