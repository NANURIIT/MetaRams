package com.nanuri.rams.business.assessment.as04.as04220;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS04220S")
@RequiredArgsConstructor
@RestController
public class AS04220Controller {

	private final AS04220Service as04220Service;

	@GetMapping(value = "/getDealInfoByEno")
	public List<DealInfo> getDealInfoByEno(SearchVO paramData) {
		return as04220Service.getDealInfoByEno(paramData);
	}

	@PostMapping(value = "/confirmFile")
	public int confirmFile(RAA23BDTO param) {
		return as04220Service.confirmFile(param);
	}
	
	@PostMapping(value = "/updateAprvOpstnCcd")
	public int updateAprvOpstnCcd(RAA23BDTO param) {
		return as04220Service.updateAprvOpstnCcd(param);
	}
	
	
	
}
