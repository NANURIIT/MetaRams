package com.nanuri.rams.business.assessment.tb07.tb07230;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.assessment.tb07.tb07200.TB07200Service;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import com.nanuri.rams.business.common.vo.IBIMS902BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07230S")
@RequiredArgsConstructor
@RestController
public class TB07230APIController {

	private final TB07230Service tb07230Service;
	private final TB07200Service tb07200Service;

	/**
	 * SPC별 거래내역 조회
	 * 
	 * @param IBIMS902BVO
	 * @return List<IBIMS902BVO>
	 */
	@GetMapping("/selectTB07230S")
	public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param) {
		return tb07230Service.selectTB07230S(param);
	}

	/**
	 * 자금집행업무지시요청 목록 번호 조회
	 * 
	 * @param IBIMS900BVO
	 * @return List<IBIMS900BVO>
	 */
	@GetMapping("/selectSpcList")
	public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param) {
		return tb07200Service.selectSpcList(param);
	}

	@PostMapping(value = "/saveTB07230S")
	public int saveTB07230S(@RequestBody IBIMS902BVO paramData) {
		return tb07230Service.saveTB07230S(paramData);
	}
}
