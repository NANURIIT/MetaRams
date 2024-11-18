package com.nanuri.rams.business.assessment.tb06.tb06040;

import com.nanuri.rams.business.common.dto.IBIMS301BDTO;
import com.nanuri.rams.business.common.dto.TB06040SDTO;
import com.nanuri.rams.business.common.vo.TB06040SVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/TB06040S")
@RequiredArgsConstructor
@RestController
public class TB06040APIController {

	private final TB06040Service tb06040Service;

	// 약정 및 해지 정보 조회
	@GetMapping(value = "/searchIBInfo")
	public TB06040SVO searchIBInfo(@RequestParam String prdtCd) {
		return tb06040Service.searchIBInfo(prdtCd);
	}

	// 약정 및 해지 정보 실행
	@PostMapping(value = "/saveCtrcCclcInfo")
	public int saveCtrcCclcInfo(@RequestBody TB06040SDTO paramData) { 
		log.info("info /saveCtrcCclcInfo ::: TB06040SDTO paramData :::::: {}", paramData);
		log.debug("/saveCtrcCclcInfo ::: TB06040SDTO paramData :::::: {}", paramData);
		log.debug("/saveCtrcCclcInfo ::: TB06040SDTO paramData.getCtrcCclcDcd() :::::: {}", paramData.getCtrcCclcDcd());
		return tb06040Service.saveCtrcCclcInfo(paramData);
    }


}
