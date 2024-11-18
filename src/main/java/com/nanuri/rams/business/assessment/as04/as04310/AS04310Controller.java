package com.nanuri.rams.business.assessment.as04.as04310;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.AS04310SVO.DealInfo;
import com.nanuri.rams.business.common.vo.AS04310SVO.SearchVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS04310S")
@RequiredArgsConstructor
@RestController
public class AS04310Controller {

	private final AS04310Service as04310Service;

	// 안건정보 검색
	@GetMapping(value = "/searchDeals")
	public List<DealInfo> searchDeals(SearchVO paramData) {
		return as04310Service.searchDeals(paramData);
	}

}
