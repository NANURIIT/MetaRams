package com.nanuri.rams.business.assessment.tb07.tb07230;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS902BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07230S")
@RequiredArgsConstructor
@RestController
public class TB07230APIController {

	private final TB07230Service TB07230Service;

	/**
	 * 승인내역조회
	 * @param param
	 * @return
	 */
	@GetMapping("/selectTB07230S")
	public List<IBIMS902BVO> selectTB07230S(IBIMS902BVO param) {
		return TB07230Service.selectTB07230S(param);
	}

}
