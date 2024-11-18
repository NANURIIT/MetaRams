package com.nanuri.rams.business.assessment.tb08.tb08031;

import com.nanuri.rams.business.common.dto.IBIMS508BDTO;
import com.nanuri.rams.business.common.vo.*;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RequestMapping("/TB08031S")
@RequiredArgsConstructor
@RestController
public class TB08031APIController {
	
	private final TB08031Service tb08031Service;
	
	// 투자자산사업기본 조회
	@GetMapping(value = "/getBusiBssInfo")
	public IBIMS501BVO getBusiBssInfo(IBIMS501BVO param) {
		return tb08031Service.getBusiBssInfo(param);
	}
	
	// 탭정보 등록
	@PostMapping(value = "/saveDealInfo", produces = "application/json; charset=utf-8")
	public int saveDealInfo(@RequestBody IBIMS501BVO param) {
		return tb08031Service.saveDealInfo(param);
	}
	
	// 사업참가자정보 등록
	@PostMapping(value = "/saveBsnsPartInfo", produces = "application/json; charset=utf-8")
	public int saveBsnsPartInfo(@RequestBody IBIMS511BVO2 param) {
		return tb08031Service.saveBsnsPartInfo(param);
	}
	
	// 사업주요전망 등록
	@PostMapping(value = "/saveBsnsForecast", produces = "application/json; charset=utf-8")
	public int saveBsnsForecast(@RequestBody IBIMS514BVO2 param) {
		return tb08031Service.saveBsnsForecast(param);
	}
	
	// 채권보전주요약정 등록
	@PostMapping(value = "/saveBondProtInfo", produces = "application/json; charset=utf-8")
	public int saveBondProtInfo(@RequestBody IBIMS509BVO2 param) {
		return tb08031Service.saveBondProtInfo(param);
	}
	
	// 조건변경이력 등록
	@PostMapping(value = "/saveCchInfo", produces = "application/json; charset=utf-8")
	public int saveCchInfo(@RequestBody IBIMS510BVO2 param) {
		return tb08031Service.saveCchInfo(param);
	}
	
	// 대주단정보 등록
	@PostMapping(value = "/saveStlnInfo", produces = "application/json; charset=utf-8")
	public int saveStlnInfo(@RequestBody IBIMS513BVO2 param) {
		return tb08031Service.saveStlnInfo(param);
	}

	// 수익자정보 등록
	@PostMapping(value = "/saveErnInfo", produces = "application/json; charset=utf-8")
	public int saveErnInfo(@RequestBody IBIMS513BVO2 param) {
		return tb08031Service.saveErnInfo(param);
	}

	// 관련사업정보 등록
	@PostMapping(value = "/saveReltBusiInfo", produces = "application/json; charset=utf-8")
	public int saveReltBusiInfo(@RequestBody IBIMS508BVO2 param) { return tb08031Service.saveReltBusiInfo(param); }

	// 편입자산정보 등록
	@PostMapping(value = "/saveAdmsAsstInfo", produces = "application/json; charset=utf-8")
	public int saveAdmsAsstInfo(@RequestBody IBIMS512BVO2 param) { return tb08031Service.saveAdmsAsstInfo(param); }

	// 투자기업정보 등록
	@PostMapping(value = "/saveInvstEprzInfo", produces = "application/json; charset=utf-8")
	public int saveInvstEprzInfo(@RequestBody IBIMS518BVO2 param) { return tb08031Service.saveInvstEprzInfo(param); }

	// 자산운용사정보 등록
	@PostMapping(value = "/saveAsstOrtnInfo", produces = "application/json; charset=utf-8")	
    public int saveAsstOrtnInfo(@RequestBody IBIMS515BVO2 param) { return tb08031Service.saveAsstOrtnInfo(param); }
    
}
