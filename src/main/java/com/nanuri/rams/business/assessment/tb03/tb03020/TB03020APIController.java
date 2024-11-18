package com.nanuri.rams.business.assessment.tb03.tb03020;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB03020S")
@RequiredArgsConstructor
@RestController
public class TB03020APIController {
	
	private final TB03020Service tb03020Service;

	// 저장 후 조회 시 딜번호 채번
	/*
	@GetMapping(value = "/selDealMngNo")
	public String selDealMngNo() {
		return tb03020Service.getDealMngNo();
	}
	 */

	// 조회
	@GetMapping(value = "/getBscDealDetail")
	public IBIMS101BVO getBscDealDetail(IBIMS101BDTO dealInfo) {
		return tb03020Service.getBscDealDetail(dealInfo);
	}

	// 딜 등록 화면 진입시 딜번호 채번
	@PostMapping(value = "/getDealNo")
	public String getDealNo() {
		return tb03020Service.getDealNo();
	}
	
	// 신규등록
	@PostMapping(value = "/saveDeal")
	public String saveDeal(@RequestBody IBIMS101BDTO dealInfo) { return tb03020Service.saveDeal(dealInfo);}

	// 결재요청
	@PostMapping(value = "/reqApproveDeal")
	public int reqApproveDeal(IBIMS100BVO.selectVO toDoInfo) {
		return tb03020Service.reqApproveDeal(toDoInfo);
	}

	// 결재승인
	@PostMapping(value = "/cnfmDeal")
	public int cnfmDeal(@RequestBody IBIMS101BDTO dealInfo) {
		return tb03020Service.cnfmDeal(dealInfo);
	}

	// 반송
	@PostMapping(value = "/rejtDeal")
	public int rejtDeal(@RequestParam String mngDealNo) {
		return tb03020Service.rejtDeal(mngDealNo);
	}


}
