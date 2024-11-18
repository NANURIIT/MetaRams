package com.nanuri.rams.business.assessment.tb04.tb04050;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS224BVO;
import com.nanuri.rams.business.common.vo.TB04050SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04050S")
@RequiredArgsConstructor
@RestController
public class TB04050APIController {
	
	private final TB04050Service tb04050Service;
	
	// LOI/LOC 발급 조회
	@GetMapping(value = "/getLoi")
	public TB04050SVO getLoi(TB04050SVO param) {
		log.debug("APIController => getLoi 실행!!");
		log.debug("param{}", param);
		return tb04050Service.getLoi(param);
	}
	
	// LOI/LOC 발급 저장
	@PostMapping(value = "/registLoi")
	public int registLoi(IBIMS224BVO param) {
		log.debug("APIController => registLoi 실행!!");
		log.debug("param{}", param);

		return tb04050Service.registLoi(param);
	}
}
