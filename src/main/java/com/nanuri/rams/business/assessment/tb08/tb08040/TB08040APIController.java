package com.nanuri.rams.business.assessment.tb08.tb08040;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS348BDTO;
import com.nanuri.rams.business.common.vo.IBIMS348BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB08040S")
@RequiredArgsConstructor
@RestController
public class TB08040APIController {

	private final TB08040Service tb08040svc;

	// 수수료스케줄관리 조회
	@PostMapping(value = "/srchFeeSch")
	public List<IBIMS348BVO> srchFeeSch(IBIMS348BVO param) {

		log.debug("\n prdtCd ::: {}", param.getPrdtCd());

		return tb08040svc.srchFeeSch(param);
	}

	// 수수료스케줄관리 조회
	@PostMapping(value ="/saveFeeSch")
	public int saveFeeSch(@RequestBody IBIMS348BVO input) {

		log.debug("\n List<IBIMS348BVO> ::: {}", input);

		return tb08040svc.saveFeeSch(input); 
	}
}
