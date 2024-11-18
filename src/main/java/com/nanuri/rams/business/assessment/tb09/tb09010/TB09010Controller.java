package com.nanuri.rams.business.assessment.tb09.tb09010;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.vo.IBIMS604BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * MO44010Controller
 */
@Slf4j
@RequestMapping("/TB09010S")
@RequiredArgsConstructor
@RestController
public class TB09010Controller {
	
	private final TB09010Service tb09010service;
	private final CommonService commonService;
	
	@GetMapping(value = "/checkDealSearch") 
	public List<IBIMS604BVO.DealInfo>checkDealSearch(IBIMS604BVO.SearchVO searchVo){
		return tb09010service.checkDealSearch(searchVo);
	}
	
	@GetMapping(value = "/saveDealExmnt") 
	public int saveDealExmnt(IBIMS604BVO.ExmntInfo exmntInfo){
		
		Map<String, Object> userAuth = commonService.getUserAuth();
		return tb09010service.saveDealExmnt(exmntInfo, userAuth);
	}

	/*
	 * private final MO44010Service mo44010service;
	 * 
	 * @GetMapping(value = "/getPacmList") public List<MO44020SVO>
	 * getPaCndtMgmt(MO44020SVO pacmInfo){ return
	 * mo44020service.getPaCndtMgmt(pacmInfo); }
	 */
}

