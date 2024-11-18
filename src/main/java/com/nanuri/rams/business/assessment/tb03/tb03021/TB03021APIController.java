package com.nanuri.rams.business.assessment.tb03.tb03021;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS101BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB03021P")
@RequiredArgsConstructor
@RestController
public class TB03021APIController {

	private final TB03021Service tb03021Service;
	// private final CommonService commonService;

	// 안건목록조회
	@GetMapping(value = "/getDealInfo")
	public List<IBIMS101BVO> getDealInfo(IBIMS101BVO param) {
		return tb03021Service.getDealInfo(param);
	}

	// 딜변경이력SN조회
	@GetMapping(value = "/getDealSnHis")
	public List<IBIMS101BVO> getDealSnHis(IBIMS101BVO param) {
		return tb03021Service.getDealSnHis(param);
	}
	
}
