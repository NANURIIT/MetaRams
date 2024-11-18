package com.nanuri.rams.business.assessment.tb07.tb07040;

import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.dto.IBIMS405BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS405BVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequestMapping("/TB07040S")
@RequiredArgsConstructor
@RestController
public class TB07040APIController {

	private final TB07040Service tb07040Service;

	/* 기업여신정보 조회
	@GetMapping(value = "/getDetailInfo")
	public IBIMS401BVO getDetailInfo(IBIMS401BDTO paramData) {
		return tb07010Service.getDetailInfo(paramData);
	}
	 */

	// 실행정보 목록 조회
	@GetMapping(value = "/getSellList")
	public List<IBIMS405BVO> getSellList(IBIMS405BDTO paramData){ return tb07040Service.getSellList(paramData); }

	// 실행정보 저장
	@PostMapping(value = "/saveSellInfo")
	public int saveSellInfo(IBIMS405BDTO paramData) {
		return tb07040Service.saveSellInfo(paramData);
	}

	// 실행정보 저장 (배당금)
	@PostMapping(value = "/saveDvdnInfo")
	public int saveDvdnInfo(IBIMS405BDTO paramData){
		return tb07040Service.saveDvdnInfo(paramData);
	}

	// 실행정보 취소
	@PostMapping(value = "/cancelSellInfo")
	public int cancelSellInfo(IBIMS405BDTO paramData) {
		return tb07040Service.cancelSellInfo(paramData);
	}

	// @PostMapping(value = "/cancelDvdnList")
	// public int cancelDvdnList(IBIMS405BDTO paramData){
	// 	return tb07040Service.cancelDvdnList(paramData);
	// }

	// 거래번호 조회
	@GetMapping(value = "/getTrSn")
	public int getTrSn(IBIMS405BDTO paramData){ return tb07040Service.getTrSn(paramData); }

	// 딜거래내역 저장
	@PostMapping(value = "/saveDlTrList")
	public int saveDlTrList(IBIMS410BDTO paramData) {
		return tb07040Service.saveDlTrList(paramData);
	}

	// 딜거래내역 업데이트
	@PostMapping(value = "/updateDlTrList")
	public int updateDlTrList(IBIMS410BDTO paramData) {
		return tb07040Service.updateDlTrList(paramData);
	}

	// 딜거래내역 취소
	@PostMapping(value = "/cancelDlTrList")
	public int cancelDlTrList(IBIMS410BDTO paramData) {
		return tb07040Service.cancelDlTrList(paramData);
	}

	//여신실행기본조회 데이터확인
	@PostMapping(value = "/chkExcInfo")
	public String chkExcInfo(@RequestBody String prdtCd) {
		return tb07040Service.chkExcInfo(prdtCd);
	}

	//딜실행기본 insert
	@PostMapping(value = "/saveExcInfo")
	public int saveExcInfo(IBIMS402BDTO param) {
		return tb07040Service.saveExcInfo(param);
	}
	//딜실행기본 update
	@PostMapping(value = "/uptExcInfoTr")
	public int uptExcInfoTr(IBIMS402BDTO param) {
		return tb07040Service.uptExcInfoTr(param);
	}
	//딜실행기본 insert No Key
	@PostMapping(value = "/saveExcInfoNoKey")
	public int saveExcInfoNoKey(IBIMS402BDTO param) {
		return tb07040Service.saveExcInfoNoKey(param);
	}

	//딜실행기본이력 insert
	@PostMapping(value = "/insertIBIMS402HTr")
	public int insertIBIMS402HTr(IBIMS402BDTO param) {
		return tb07040Service.insertIBIMS402HTr(param);
	}
}
