package com.nanuri.rams.business.assessment.dm33.dm33020;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/DM33020S")
@RequiredArgsConstructor
@RestController
public class DM33020Controller {
	
	private final DM33020Service dm33020service;
	
	// 매핑 목록 조회
	@GetMapping(value = "/getMngList")
	public List<Map<String, Object>> getMngList(@RequestParam HashMap<String, Object> inputParam){
		return dm33020service.getMngList(inputParam);
	}

	/*
	// 투자자산 매핑 저장
	@PostMapping(value = "/saveMappingInfo")
	public int saveMappingInfo(@RequestBody List<Map<String, Object>> inputArr){
		return dm33010service.saveMappingInfo(inputArr);
	}
	 */

	
}
