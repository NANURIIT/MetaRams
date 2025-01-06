package com.nanuri.rams.business.assessment.tb06.tb06081;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS003BVO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06081P")
@RequiredArgsConstructor
@RestController
public class TB06081APIController {

	private final TB06081Service tb06081Service;

	/**
	 * 결재요청가능한 사원 조회
	 * @param paramData
	 * @return
	 */
	@PostMapping("/srchApvlList")
	public List<IBIMS003BVO> srchApvlList(@RequestBody IBIMS003BVO paramData) {
		return tb06081Service.srchApvlList(paramData);
	}
	
	/**
	 * 결재
	 * @param paramData
	 * @return
	 */
	@PostMapping("/apvlRqst")
	public int apvlRqst(@RequestBody IBIMS231BVO paramData) {
		return tb06081Service.apvlRqst(paramData);
	}

	/**
	 * 결재취소 요청
	 * @param paramData
	 * @return
	 */
	@PostMapping("/cancelApvlRqst")
	public int cancelApvlRqst(@RequestBody IBIMS231BVO paramData) {
		return tb06081Service.cancelApvlRqst(paramData);
	}

	/**
	 * 결재요청내역 확인
	 * @param paramData
	 * @return
	 */
	@PostMapping("/apvlListChk")
	public List<IBIMS003BVO> apvlListChk(@RequestBody IBIMS231BDTO paramData) {
		return tb06081Service.apvlListChk(paramData);
	}
	
}
