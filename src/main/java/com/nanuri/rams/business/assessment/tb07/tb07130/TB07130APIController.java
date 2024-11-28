package com.nanuri.rams.business.assessment.tb07.tb07130;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS451BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS451BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07130S")
@RequiredArgsConstructor
@RestController
public class TB07130APIController {
	
	private final TB07130Service tb07130Service;

	@PostMapping(value = "/selectIBIMS451B")
	public List<IBIMS451BVO> selectIBIMS451B(@RequestBody IBIMS451BDTO param) {
		return tb07130Service.selectIBIMS451B(param);
	}
	
	@PostMapping(value = "/thdtTrDtlsGetData")
	public List<IBIMS410BVO> thdtTrDtlsGetData(@RequestBody IBIMS451BDTO param) {
		return tb07130Service.thdtTrDtlsGetData(param);
	}
}
