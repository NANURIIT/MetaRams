package com.nanuri.rams.business.assessment.tb07.tb07110;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07110S")
@RequiredArgsConstructor
@RestController
public class TB07110APIController {
	
	private final TB07110Service tb07110Service;


	// 지급품의 기본 조회
	@PostMapping(value = "/selectIBIMS431B")
	public List<IBIMS431BVO> selectIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07110Service.selectIBIMS431B(param);
	}

	// 지급품의 상세 조회
	@PostMapping(value = "/selectIBIMS432B")
	public List<IBIMS432BVO> selectIBIMS432B(@RequestBody IBIMS432BVO param) {
		return tb07110Service.selectIBIMS432B(param);
	}

	// 결재요청
	@PostMapping(value = "/apvlRqst")
	public int apvlRqst(@RequestBody IBIMS431BVO param) {
		return tb07110Service.apvlRqst(param);
	}

	// 지급품의 등록/변경
	@PostMapping(value = "/mergeIBIMS431B")
	public int mergeIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07110Service.mergeIBIMS431B(param);
	}

	// 기본 삭제
	@PostMapping(value = "/deleteIBIMS431B")
	public int deleteIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07110Service.deleteIBIMS431B(param);
	}

	// 상세 삭제
	@PostMapping(value = "/deleteIBIMS432B")
	public int deleteIBIMS432B(@RequestBody IBIMS432BVO param) {
		return tb07110Service.deleteIBIMS432B(param);
	}
	
}
