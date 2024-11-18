package com.nanuri.rams.business.assessment.as03.as03010;

import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealDetails;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS03010SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS03010S")
@RequiredArgsConstructor
@RestController
public class AS03010APIController {
	
	private final AS03010Service as03010Service;
	private final CommonService commonService;
	
	// 심사안건조회
	@GetMapping(value = "/checkDealSearch")
	public List<checkDealDetails> checkDealSearch(checkDealInfo dealDto) throws ParseException{
		return as03010Service.checkDealSearch(dealDto);
	}
	
	// 심사안건 반송
	@PostMapping(value = "/returnDeal")
	public int returnDeal(AS03010SVO param) {

		Map<String, Object> dealInfoMap = as03010Service.returnDeal(param);

		return commonService.registHistoy(dealInfoMap);
	}
	
	// 심사안건 접수
	@PostMapping(value = "/receiptDeal")
	public int receiptDeal(AS03010SVO param) {

		Map<String, Object> dealInfoMap = as03010Service.receiptDeal(param);

		return commonService.registHistoy(dealInfoMap);
	}

}
