package com.nanuri.rams.business.assessment.mo44.mo44040;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA31BDTO;
import com.nanuri.rams.business.common.vo.MO44040SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * MO44040APIController
 */
@Slf4j
@RequestMapping("/MO44040S")
@RequiredArgsConstructor
@RestController
public class MO44040APIController {
	
	private final MO44040Service mo44040service;
	
	@GetMapping(value = "/getInfo") 
	public List<MO44040SVO.DealInfo>getInfo(MO44040SVO.SearchParam searchParam){
		return mo44040service.getInfo(searchParam);
	}
	
	@Transactional
	@PostMapping(value = "/savePlans") 
	public void savePlans(MO44040SVO.DealInfo paramData){
		mo44040service.savePlans(paramData);
	}
	
	@Transactional
	@PostMapping(value = "/savePFRM") 
	public void savePFRM(MO44040SVO.DealInfo paramData){
		mo44040service.savePFRM(paramData);
	}
	
	@Transactional
	@PostMapping(value = "/savePrgrs") 
	public void savePrgrs(RAA31BDTO paramData){
		mo44040service.savePrgrs(paramData);
	}
	
}

