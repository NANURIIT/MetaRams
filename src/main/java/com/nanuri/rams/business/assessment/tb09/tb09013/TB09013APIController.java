package com.nanuri.rams.business.assessment.tb09.tb09013;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS752BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Slf4j
@RequestMapping("/TB09013S")
@RequiredArgsConstructor
@RestController
public class TB09013APIController {

	private final TB09013Service tb09013service;

	@GetMapping(value = "/getLmtFcssList")
	public List<IBIMS752BVO> getLmtFcssList(IBIMS752BVO params) {
		return tb09013service.getLmtFcssList(params);
	}

	@GetMapping(value = "/getMsgTranList")
	public List<IBIMS752BVO> getMsgTransList(IBIMS752BVO params) {
		return tb09013service.getMsgTransList(params);
	}
	
	@GetMapping(value = "/getErrDpchList")
	public List<IBIMS752BVO> getErrDpchTabList(IBIMS752BVO params) {
		return tb09013service.getErrDpchTabList(params);
	}

	@PostMapping(value = "/saveLmtFcssList")
    public int saveLmtFcssList(@RequestBody IBIMS752BVO param){
		
        return tb09013service.saveLmtFcssList(param);
    }
	
	@PostMapping(value = "/saveMsgTranList")
    public int saveMsgTransList(@RequestBody IBIMS752BVO param){
		
        return tb09013service.saveMsgTransList(param);
    }
	
	@PostMapping(value = "/saveErrDpchList")
    public int saveErrDpchList(@RequestBody IBIMS752BVO param){
		
        return tb09013service.saveErrDpchList(param);
    }
}
