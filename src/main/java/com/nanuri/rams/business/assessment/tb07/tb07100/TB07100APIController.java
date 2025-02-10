package com.nanuri.rams.business.assessment.tb07.tb07100;


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
@RequestMapping("/TB07100S")
@RequiredArgsConstructor
@RestController
public class TB07100APIController {
	
	private final TB07100Service tb07100Service;

	// 지급품의기본 조회
	@PostMapping(value = "/selectIBIMS431B")
	public List<IBIMS431BVO> selectIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07100Service.selectIBIMS431B(param);
	}

	// 지급품의상세 조회
	@PostMapping(value = "/selectIBIMS432B")
	public List<IBIMS432BVO> selectIBIMS432B(@RequestBody IBIMS432BVO param) {
		return tb07100Service.selectIBIMS432B(param);
	}

	// 지급품의기본 등록
	@PostMapping(value = "/insertIBIMS431B")
	public int insertIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07100Service.insertIBIMS431B(param);
	}

	// 지급품의기본 변경
	@PostMapping(value = "/updateIBIMS431B")
	public int updateIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07100Service.updateIBIMS431B(param);
	}

	// 지급품의기본 삭제
	@PostMapping(value = "/deleteIBIMS431B")
	public int deleteIBIMS431B(@RequestBody IBIMS431BVO param) {
		return tb07100Service.deleteIBIMS431B(param);
	}

	// 지급품의상세 저장
	@PostMapping(value = "/saveIBIMS432B")
	public int saveIBIMS432B(@RequestBody List<IBIMS432BVO> param) {
		return tb07100Service.saveIBIMS432B(param);
	}

	// 결재요청
	@PostMapping(value = "/apvlRqst")
	public int apvlRqst(@RequestBody IBIMS431BVO param) {
		return tb07100Service.apvlRqst(param);
	}

	// 승인취소
	@PostMapping(value = "/apvlRqstCncl")
	public int apvlRqstCncl(@RequestBody IBIMS431BVO param) {
		return tb07100Service.apvlRqstCncl(param);
	}

	// 승인
	@PostMapping(value = "/apvl")
	public int apvl(@RequestBody IBIMS431BVO param) {
		return tb07100Service.apvl(param);
	}

	// 반려
	@PostMapping(value = "/rjct")
	public int rjct(@RequestBody IBIMS431BVO param) {
		return tb07100Service.rjct(param);
	}

}
