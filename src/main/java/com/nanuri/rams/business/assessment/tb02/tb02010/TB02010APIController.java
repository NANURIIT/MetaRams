package com.nanuri.rams.business.assessment.tb02.tb02010;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO.selectVO;
import com.nanuri.rams.business.common.vo.TB02010SVO;
import com.nanuri.rams.com.WF.WorkFlow;
import com.nanuri.rams.com.dto.WorkFlowDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RequestMapping("/TB02010S")
@RequiredArgsConstructor
@RestController
public class TB02010APIController {
	
	private final TB02010Service tb02010Service;
	//private final WorkFlow workFlow;
	
	// 오늘의할일추가를 위한 (SQ)조회
	@GetMapping(value = "/getSeq")
	public int getSeq(IBIMS100BDTO getSeq) {
		return tb02010Service.getSeqNo(getSeq);
	}
	
	// 오늘의할일 summery조회
	@GetMapping(value = "/getSummary")
	public List<IBIMS100BVO> getSummary(IBIMS100BVO getSummary) {
		return tb02010Service.getSummaryInfo(getSummary);
	}
	
	// 오늘의할일 조회
	// @GetMapping(value = "/selInfo")
	// public List<IBIMS100BVO.selectVO> selInfo(selectVO selInfo) {
	// 	return tb02010Service.selectIBIMS100BInfo(selInfo);
	// }
	@GetMapping(value = "/selInfo")
	public TB02010SVO selInfo(WorkFlowDTO param){
		return tb02010Service.workFlowInq(param);
	}
	
	// 오늘의할일등록
	@PostMapping(value = "/insertInfo")
	public int insertInfo(IBIMS100BDTO insertInfo) {
		return tb02010Service.insertIBIMS100BInfo(insertInfo);
	}
	
	// 오늘의할일변경(결재)
	@PostMapping(value = "/updateInfO")
	public int updateInfO(IBIMS100BDTO updateInfO) {
		return tb02010Service.updateIBIMS100BInfO(updateInfO);
	}
	
	// 오늘의할일변경(결재요청취소)
	@PostMapping(value = "/deleteInfo")
	public int deleteInfo(IBIMS100BDTO deleteInfo) {
		return tb02010Service.deleteIBIMS100BInfo(deleteInfo);
	}

	/**
	 * 오늘의 할일 2025-02-03 김건우
	 */
	@PostMapping("/myJob")
	public List<IBIMS231BVO> myJob() {
		return tb02010Service.myJob();
	}
	

	/**
	 * 일하러가는 화면명과 조회 키값
	 */
	@PostMapping("/justWork")
	public IBIMS231BDTO justWork (@RequestBody IBIMS231BDTO param ) {
		return tb02010Service.justWork(param);
	}
}
