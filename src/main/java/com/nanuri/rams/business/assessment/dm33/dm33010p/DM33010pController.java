package com.nanuri.rams.business.assessment.dm33.dm33010p;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/DM33010P")
@RequiredArgsConstructor
@RestController
public class DM33010pController {
	
	private final DM33010pService dm33010pservice;
	
	// 매핑 목록 조회
	@GetMapping(value = "/getRiskRcgNoList")
	public List<Map<String, Object>> getRiskRcgNoList(@RequestParam HashMap<String, Object> param){
		return dm33010pservice.getRiskRcgNoList(param);
	}

	/*
	@PostMapping(value = "/mergeMntrCntnt")
	public int mergeMntrCntnt(RAA65BDTO inputParam){
		return pm22110service.mergeMntrCntnt(inputParam);
	}

	 */
	
}
