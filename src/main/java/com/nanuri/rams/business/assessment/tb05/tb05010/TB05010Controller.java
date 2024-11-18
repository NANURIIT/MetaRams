package com.nanuri.rams.business.assessment.tb05.tb05010;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.IBIMS111BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB05010S")
@RequiredArgsConstructor
@RestController
public class TB05010Controller {

	private final TB05010Service tb05010Service;

	// 마지막 협의정보 검색
	@GetMapping(value = "/getLastCNFRNCInfo")
	public IBIMS111BVO getLastCNFRNCInfo(IBIMS111BDTO paramData) {
		return tb05010Service.getLastCNFRNCInfo(paramData);
	}
	
	// 협의정보 - 리스트 검색
	@GetMapping(value = "/getCNFRNCList")
	public List<IBIMS111BVO> getCNFRNCList(IBIMS111BDTO paramData) { return tb05010Service.getCNFRNCList(paramData); }
	
	// 협의정보 - 기본정보 검색
	@GetMapping(value = "/getCNFRNCInfo")
	public IBIMS111BVO getCNFRNCInfo(IBIMS111BDTO paramData) {
		return tb05010Service.getCNFRNCInfo(paramData);
	}
	
	// 협의정보 - 위원정보 검색
	@GetMapping(value = "/getMMBRInfo")
	public List<IBIMS115BVO> getMMBRInfo(IBIMS115BDTO paramData) {
		return tb05010Service.getMMBRInfo(paramData);
	}
	
	// 협의정보 - 안건정보 검색
	@GetMapping(value = "/getCaseInfo")
	public List<IBIMS112BVO> getCaseInfo(IBIMS112BDTO paramData) {
		return tb05010Service.getCaseInfo(paramData);
	}
	
	// 협의정보 - 안건정보 추가
	@GetMapping(value = "/getDealDetail")
	public IBIMS103BVO getDealDetail(IBIMS103BDTO paramData) {
		return tb05010Service.getDealDetail(paramData);
	}
	
	// 임시저장 - 위원회 기본정보, 안건정보, 위원정보
	@PostMapping(value = "/tempSaveComtInfo")
	public int tempSaveComtInfo(@RequestBody IBIMS111BDTO paramData) { return tb05010Service.tempSaveComtInfo(paramData); }
	
	// 준비확정 or 준비취소
	@PostMapping(value = "/changeCNFRNCStatus")
	public int changeCNFRNCStatus(@RequestBody IBIMS111BDTO paramData) { return tb05010Service.changeCNFRNCStatus(paramData); }
	
	
}
