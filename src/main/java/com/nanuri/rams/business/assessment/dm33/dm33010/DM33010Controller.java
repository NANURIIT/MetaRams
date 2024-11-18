package com.nanuri.rams.business.assessment.dm33.dm33010;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/DM33010S")
@RequiredArgsConstructor
@RestController
public class DM33010Controller {
	
	private final DM33010Service dm33010service;
	
	// 매핑 목록 조회
	@GetMapping(value = "/selMappingList")
	public List<Map<String, Object>> selMappingList(@RequestParam HashMap<String, Object> sttnList){
		return dm33010service.selMappingList(sttnList);
	}

	// 투자자산 매핑 저장
	@PostMapping(value = "/saveMappingInfo")
	public int saveMappingInfo(@RequestBody List<Map<String, Object>> inputArr){
		return dm33010service.saveMappingInfo(inputArr);
	}


	
}
