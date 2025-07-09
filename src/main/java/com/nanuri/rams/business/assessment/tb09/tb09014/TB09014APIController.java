package com.nanuri.rams.business.assessment.tb09.tb09014;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS753BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Slf4j
@RequestMapping("/TB09014S")
@RequiredArgsConstructor
@RestController
public class TB09014APIController {

	private final TB09014Service tb09014service;

	@GetMapping(value = "/getMrtgFcsList")
	public List<IBIMS753BVO> getMrtgFcsList(IBIMS753BVO params) {
		return tb09014service.getMrtgFcsList(params);
	}

	@GetMapping(value = "/getMsgTranList")
	public List<IBIMS753BVO> getMsgTransList(IBIMS753BVO params) {
		return tb09014service.getMsgTransList(params);
	}
	
	@GetMapping(value = "/getErrDpchList")
	public List<IBIMS753BVO> getErrDpchTabList(IBIMS753BVO params) {
		return tb09014service.getErrDpchTabList(params);
	}

	@PostMapping(value = "/saveMrtgFcsList")
    public int saveMrtgFcsList(@RequestBody IBIMS753BVO param){
		
        return tb09014service.saveMrtgFcsList(param);
    }
	
	@PostMapping(value = "/saveMsgTranList")
    public int saveMsgTransList(@RequestBody IBIMS753BVO param){
		
        return tb09014service.saveMsgTransList(param);
    }
	
	@PostMapping(value = "/saveErrDpchList")
    public int saveErrDpchList(@RequestBody IBIMS753BVO param){
		
        return tb09014service.saveErrDpchList(param);
    }
}
