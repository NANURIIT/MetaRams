package com.nanuri.rams.business.assessment.as04.as04010;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS04010S")
@RequiredArgsConstructor
@RestController
public class AS04010Controller {

	private final AS04010Service as04010Service;
	private final CommonService commonService;

	// Deal 목록 조회
	@GetMapping(value = "/getDealList")
	public List<AS04010SVO> getDealList(RAA02BDTO dealDto) {
		return as04010Service.getDealList(dealDto);
	}

	@GetMapping(value = "/getDealDetail")
	public AS04010SVO getDealDetail(RAA02BDTO dealDto) {
		return as04010Service.getDealDetail(dealDto);
	}
	
	// 협의체부의 저장
	@Transactional
	@PostMapping(value = "/saveDealInfo")
	public int saveDealInfo(AS04010SVO paramData) {

		Map<String, Object> dealInfoMap = as04010Service.saveDealInfo(paramData);

		return commonService.registHistoy(dealInfoMap);
	}
	
	// 협의체부의 변경
	@Transactional
	@PostMapping(value = "/updateDealInfo")
	public int updateDealInfo(AS04010SVO paramData) {

		Map<String, Object> dealInfoMap = as04010Service.updateDealInfo(paramData);

		return commonService.registHistoy(dealInfoMap);
	}
	
}
