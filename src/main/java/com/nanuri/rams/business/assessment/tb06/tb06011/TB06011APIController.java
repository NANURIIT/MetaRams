package com.nanuri.rams.business.assessment.tb06.tb06011;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06011P")
@RequiredArgsConstructor
@RestController
public class TB06011APIController {

	private final TB06011Service tb06011Service;

	// 상품코드 리스트 조회
	@PostMapping(value = "/getPrdtCdList")
	public List<IBIMS201BVO> getPrdtCdList(@RequestBody IBIMS201BDTO searchParam) {
		return tb06011Service.getPrdtCdList(searchParam);
	}

}
