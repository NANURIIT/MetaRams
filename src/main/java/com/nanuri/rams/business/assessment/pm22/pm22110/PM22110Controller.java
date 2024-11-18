package com.nanuri.rams.business.assessment.pm22.pm22110;

import java.util.List;

import com.nanuri.rams.business.common.dto.RAA65BDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.PM22110SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/PM22110S")
@RequiredArgsConstructor
@RestController
public class PM22110Controller {
	
	private final PM22110Service pm22110service;
	
	// 사후관리 현황보고 조회
	@GetMapping(value = "/getAfterMngSttnList")
	public List<PM22110SVO> getAfterMngSttnList(PM22110SVO sttnList){
		return pm22110service.getAfterMngSttnList(sttnList);
	}

	// 사후관리 현황보고 모니터링 사항 저장
	@PostMapping(value = "/mergeMntrCntnt")
	public int mergeMntrCntnt(RAA65BDTO inputParam){
		return pm22110service.mergeMntrCntnt(inputParam);
	}
	
}
