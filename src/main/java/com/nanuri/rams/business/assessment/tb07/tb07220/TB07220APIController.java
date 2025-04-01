package com.nanuri.rams.business.assessment.tb07.tb07220;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07220S")
@RequiredArgsConstructor
@RestController
public class TB07220APIController {

	private final TB07220Service tb07220Service;

	/**
	 * SPC잔고내역조회
	 * @param param
	 * @return
	 */
	@PostMapping("/selectBalanceInfoList")
	public List<IBIMS900BVO> selectBalanceInfoList( IBIMS900BVO param) {
		return tb07220Service.selectBalanceInfoList(param);
	}
}
