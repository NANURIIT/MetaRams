package com.nanuri.rams.business.assessment.tb06.tb06080;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06080S")
@RequiredArgsConstructor
@RestController
public class TB06080APIController {

	private final TB06080Service tb06080Service;
	
	// 승인요청내역 조회
	@PostMapping("/inqTB06080S")
	public List<IBIMS231BVO> inqTB06080S(@RequestBody IBIMS231BDTO paramData) {
		return tb06080Service.inqTB06080S(paramData);
	}
	
	// 결재정보 조회
	@PostMapping("/dcfcList")
	public List<IBIMS232BVO> dcfcList(@RequestBody IBIMS231BDTO paramData) {
		return tb06080Service.dcfcList(paramData);
	}

}
