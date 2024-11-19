package com.nanuri.rams.business.assessment.as05.as05010;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.AS05010SVO;
import com.nanuri.rams.business.common.vo.RAA11BVO;
import com.nanuri.rams.business.common.vo.RAA31BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS05010S")
@RequiredArgsConstructor
@RestController
public class AS05010Controller {
	
	private final AS05010Service as05010Service;
	
	// 안건관리 - 진행정보관리 조회
	@GetMapping(value = "/getDealList") 
	public List<AS05010SVO> getDealList(AS05010SVO dealList) {
		return as05010Service.getDealList(dealList);
	}
	
	//--------------------TAB1 약정/기표/철회--------------------//
	// 약정/기표/철회 저장
	
	@PostMapping(value = "/registCaseInfo") 
	public int registCaseInfo(AS05010SVO caseInfo) { 
		return as05010Service.registCaseInfo(caseInfo); 
	}
	 
	
	// 약정/기표/철회 삭제
	@PostMapping(value = "/deleteCaseInfo")
	public int deleteCaseInfo(AS05010SVO caseInfo) {
		return as05010Service.deleteCaseInfo(caseInfo);
	}

	@PostMapping(value="/updateInspctPrgrsStCd")
	public int updateInspctPrgrsStCd(AS05010SVO caseInfo) {
		return as05010Service.updateInspctPrgrsStCd(caseInfo);
	}
	
	
	//--------------------TAB2 EXIT--------------------//
	// EXIT 저장
	@PostMapping(value = "/registExitInfo")
	public int registExitInfo(AS05010SVO exitInfo) {
		return as05010Service.registExitInfo(exitInfo);
	}
	
	// EXIT 삭제
	@PostMapping(value = "deleteExitInfo")
	public int deleteExitInfo(AS05010SVO exitInfo) {
		return as05010Service.deleteExitInfo(exitInfo);
	}
	
	//--------------------TAB3 셀다운의무--------------------//
	// 셀다운 조회
	@GetMapping(value = "getOpList")
	public List<RAA31BVO> getOpList(RAA31BVO opInfo) {
		return as05010Service.getOpList(opInfo);
	}
	
	// 셀다운 저장
	@PostMapping(value = "registOpInfo")
	public int registOpInfo(RAA31BVO opInfo) {
		return as05010Service.registOpInfo(opInfo);
	}
	
	// 셀다운 삭제
	@PostMapping(value = "deleteOpInfo")
	public int deleteOpInfo(RAA31BVO opInfo) {
		return as05010Service.deleteOpInfo(opInfo);
	}
	
	//--------------------TAB4 기타의무--------------------//
	// 기타의무 조회
	@GetMapping(value = "/getEtcList")
	public List<RAA31BVO> getEtcList(RAA31BVO etcInfo) {
		return as05010Service.getEtcList(etcInfo);
	}
	
	// 기타의무 저장
	@PostMapping(value = "/registEtcInfo")
	public int registEtcInfo(RAA31BVO etcInfo) {
		return as05010Service.registEtcInfo(etcInfo);
	}
	
	// 기타의무 삭제
	@PostMapping(value = "/deleteEtcInfo")
	public int deleteEtcInfo(RAA31BVO etcInfo) {
		return as05010Service.deleteEtcInfo(etcInfo);
	}
	
	//--------------------TAB5 관리직원--------------------//
	// 관리직원 유무
	@PostMapping(value = "/checkEno")
	public int checkEno(RAA11BVO enoInfo) {
		return as05010Service.checkEno(enoInfo);
	}
	
	// 관리직원 조회
	@GetMapping(value = "/getEnoList")
	public List<RAA11BVO> getEnoList(RAA11BVO enoList) {
		return as05010Service.getEnoList(enoList);
	}
	
	// 관리직원 저장
	@PostMapping(value = "/registEnoInfo")
	public int registEnoInfo(RAA11BVO enoInfo) {
		return as05010Service.registEnoInfo(enoInfo);
	}
		
	// 관리직원 삭제
	@PostMapping(value = "/deleteEnoInfo")
	public int deleteEnoInfo(RAA11BVO enoInfo) {
		return as05010Service.deleteEnoInfo(enoInfo);
	}
}
