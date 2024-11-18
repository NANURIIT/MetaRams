package com.nanuri.rams.business.assessment.tb03.tb03040;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB03040S")
@RequiredArgsConstructor
@RestController
public class TB03040APIController {
	
	private final TB03040Service tb03040Service;

	// DEAL(사업)명세조회
	@GetMapping(value = "/ibSpecSearch")
	public List<IBIMS101BVO> ibSpecSearch(IBIMS101BDTO dealInfo) {
		return tb03040Service.ibSpecSearch(dealInfo);
	}

}
