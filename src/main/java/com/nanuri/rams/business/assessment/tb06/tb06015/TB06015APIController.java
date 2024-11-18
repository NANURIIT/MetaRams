package com.nanuri.rams.business.assessment.tb06.tb06015;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB06015OVO;
import com.nanuri.rams.business.common.vo.TB06015PVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06015P")
@RequiredArgsConstructor
@RestController
public class TB06015APIController {

	private final TB06015Service tb06015Service;

	// @GetMapping(value = "/getIntrCalcSimulation")
	// public List<TB06015OVO> getIntrCalcSimulation(TB06015PVO param) {

	// 	log.debug("여긴오냐??");

	// 	return tb06015Service.getIntrCalcSimulation(param);
	// }

	// @PostMapping(value = "/getIntrCalcSimulation")
	// public List<TB06015OVO> getIntrCalcSimulation(@RequestBody TB06015PVO param){
	// 	log.debug("==========getIntrCalcSimulation(POST)실행============");

	// 	return tb06015Service.getIntrCalcSimulation(param);
	// }

	@PostMapping(value = "/setIntrCalcSimulation")
	public TB06015SVO setIntrCalcSimulation(@RequestBody TB06015PVO param){
		log.debug("==========setIntrCalcSimulation(POST)실행============");

		return tb06015Service.setIntrCalcSimulation(param);
	}

	@PostMapping(value = "/excelVrfi")
	public String excelVrfi(@RequestBody TB06015PVO param){

		return tb06015Service.excelVrfi(param);
	}

	@GetMapping(value = "/getDetailInfo")
	public List<TB06015SVO> getDetailInfo(TB06015SVO param){
		return tb06015Service.getDetailInfo(param);
	}

	@GetMapping(value = "/getExcSn")
	public List<String> getExcSn(String prdtCd){
		log.debug("prdtCd: " + prdtCd);

		return tb06015Service.getExcSn(prdtCd);
	}
	
	
}
