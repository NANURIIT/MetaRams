package com.nanuri.rams.business.assessment.tb04.tb04040;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS224BDTO;
import com.nanuri.rams.business.common.vo.IBIMS224BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04040S")
@RequiredArgsConstructor
@RestController
public class TB04040APIController {
	
	private final TB04040Service tb04040Service;
	
	// LOI/LOC 발급내역 조회
	@GetMapping(value = "/getLoiIssDtls")
	public List<IBIMS224BVO> getLoiIssDtls(IBIMS224BVO param) {
		return tb04040Service.getLoiIssDtls(param);
	}
}
