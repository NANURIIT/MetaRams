package com.nanuri.rams.business.assessment.tb09.tb09100;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB09100S")
@RequiredArgsConstructor
@RestController
public class TB09100Controller {
	
	private final TB09100Service tb09100service;
	
	@GetMapping(value = "/selectDealExposure") 
	public List<IBIMS201BVO> selectDealExposure(IBIMS201BVO searchVO){
		return tb09100service.selectDealExposure(searchVO);
	}
	
	@GetMapping(value = "/selectFeeIntTrList") 	
	public List<IBIMS410BVO> selectFeeIntTrList(IBIMS410BDTO searchVO){
		return tb09100service.selectFeeIntTrList(searchVO);
	}

}

