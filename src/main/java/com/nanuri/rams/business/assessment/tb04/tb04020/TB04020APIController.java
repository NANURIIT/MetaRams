package com.nanuri.rams.business.assessment.tb04.tb04020;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04020S")
@RequiredArgsConstructor
@RestController
public class TB04020APIController {

	private final TB04020Service tb04020Service;

	// 심사안건조회
	@GetMapping(value = "/checkDealSearch")
	public List<IBIMS103BVO> checkDealSearch(TB04020SVO param) throws ParseException {
		return tb04020Service.checkDealSearch(param);
	}

	// 심사안건 접수
	@PostMapping(value = "/receiptDeal")
	public int receiptDeal(IBIMS103BDTO param) {
		return tb04020Service.receiptDeal(param);
	}

	// 심사안건 반송
	@PostMapping(value = "/returnDeal")
	public int returnDeal(IBIMS103BDTO param) {
		return tb04020Service.returnDeal(param);
	}

}
