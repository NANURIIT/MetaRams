package com.nanuri.rams.business.assessment.tb07.tb07030;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.TB07030SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07030S")
@RequiredArgsConstructor
@RestController
public class TB07030APIController {
	
	private final TB07030Service tb07030Service;

	// 실행정보 목록 조회
	@PostMapping(value = "/getRdmpList")
	public List<IBIMS403BVO> getRdmpList(@RequestBody IBIMS403BDTO paramData) {
		 return tb07030Service.getRdmpList(paramData); 
	}

	// 실행정보 상세내역 조회
	@PostMapping(value = "/getRdmpDetail")
	public TB07030SVO getRdmpDetail(@RequestBody TB07030SVO paramData) { 

		log.debug("/getRdmpDetail ::: TB07030SVO paramData :::::: {}", paramData );
		log.debug("/getRdmpDetail ::: TB07030SVO.getIbims403Lst() :::::: {}", paramData.getIbims403Lst().get(0).getDealMrdpPrca() );

		return tb07030Service.getRdmpDetail(paramData); 
	}

	// 상환대상 상세내역 저장
	@PostMapping(value = "/saveRdpm")
	public int saveRdpm(@RequestBody TB07030SVO paramData) { 
		
		// log.debug("/saveRdpm ::: TB07030SVO paramData :::::: {}", paramData);
		// log.debug("/saveRdpm ::: TB07030SVO paramData.ibims403Lst.size() :::::: {}", paramData.getIbims403Lst().size());
		// log.debug("/saveRdpm ::: TB07030SVO paramData.getIbims403DtlLst.size() :::::: {}", paramData.getIbims403DtlLst().size());
		// log.debug("/saveRdpm ::: TB07030SVO paramData.getIbims403DtlLst.getPaiTypCd() :::::: {}", paramData.getIbims403DtlLst().get(1).getPaiTypCd());

		return tb07030Service.saveRdpm(paramData); 
	}

	// 환율정보조회
	@PostMapping(value = "/getExchR")
	public TB07030SVO getExchR(@RequestBody String paramData) { return tb07030Service.getExchR(paramData); }
}
