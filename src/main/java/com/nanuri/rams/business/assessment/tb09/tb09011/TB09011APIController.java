package com.nanuri.rams.business.assessment.tb09.tb09011;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS751BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Slf4j
@RequestMapping("/TB09011S")
@RequiredArgsConstructor
@RestController
public class TB09011APIController {

	private final TB09011Service tb09011service;

	@GetMapping(value = "/getCrdtGrnList")
	public List<IBIMS751BVO> getCrdtGrntFcsList(IBIMS751BVO params) {
		return tb09011service.getCrdtGrntFcsList(params);
	}

	@GetMapping(value = "/getMsgTranList")
	public List<IBIMS751BVO> getMsgTransList(IBIMS751BVO params) {
		return tb09011service.getMsgTransList(params);
	}
	
	@GetMapping(value = "/getErrDpchList")
	public List<IBIMS751BVO> getErrDpchTabList(IBIMS751BVO params) {
		return tb09011service.getErrDpchTabList(params);
	}

	@PostMapping(value = "/saveCrdtGrnList")
    public int saveCrdtGrntFcsList(@RequestBody IBIMS751BVO param){
		
        return tb09011service.saveCrdtGrntFcsList(param);
    }
	
	@PostMapping(value = "/saveMsgTranList")
    public int saveMsgTransList(@RequestBody IBIMS751BVO param){
		
        return tb09011service.saveMsgTransList(param);
    }
	
	@PostMapping(value = "/saveErrDpchList")
    public int saveErrDpchList(@RequestBody IBIMS751BVO param){
		
        return tb09011service.saveErrDpchList(param);
    }
}
