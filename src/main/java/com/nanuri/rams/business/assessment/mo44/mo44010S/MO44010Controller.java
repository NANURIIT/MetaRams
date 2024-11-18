package com.nanuri.rams.business.assessment.mo44.mo44010S;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.vo.MO44010SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * MO44010Controller
 */
@Slf4j
@RequestMapping("/MO44010S")
@RequiredArgsConstructor
@RestController
public class MO44010Controller {
	
	private final MO44010Service mo44010service;
	private final CommonService commonService;
	
	@GetMapping(value = "/checkDealSearch") 
	public List<MO44010SVO.DealInfo>checkDealSearch(MO44010SVO.SearchVO searchVo){
		return mo44010service.checkDealSearch(searchVo);
	}
	
	@GetMapping(value = "/saveDealExmnt") 
	public int saveDealExmnt(MO44010SVO.ExmntInfo exmntInfo){
		
		Map<String, Object> userAuth = commonService.getUserAuth();
		return mo44010service.saveDealExmnt(exmntInfo, userAuth);
	}

	/*
	 * private final MO44010Service mo44010service;
	 * 
	 * @GetMapping(value = "/getPacmList") public List<MO44020SVO>
	 * getPaCndtMgmt(MO44020SVO pacmInfo){ return
	 * mo44020service.getPaCndtMgmt(pacmInfo); }
	 */
}

