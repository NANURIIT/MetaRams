package com.nanuri.rams.business.assessment.tb04.tb04060;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS201BVO;

import lombok.RequiredArgsConstructor;

@RequestMapping("/TB04060S")
@RequiredArgsConstructor
@RestController
public class TB04060APIController {

	private final TB04060Service tb04060Service;

	// 사업명세조회
	@GetMapping(value = "/checkDealSearch")
	public List<IBIMS201BVO> checkDealSearch(IBIMS201BVO assignInfo) {
		return tb04060Service.checkDealSearch(assignInfo);
	}

}
