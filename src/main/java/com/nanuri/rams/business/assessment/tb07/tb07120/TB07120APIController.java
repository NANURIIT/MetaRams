package com.nanuri.rams.business.assessment.tb07.tb07120;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS452BVO;
import com.nanuri.rams.business.common.vo.TB07120SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07120S")
@RequiredArgsConstructor
@RestController
public class TB07120APIController {
	
	private final TB07120Service tb07120Service;

	@PostMapping(value = "/get07120sList")
	public List<TB07120SVO> get07120sList(@RequestBody IBIMS410BVO param) {
		return tb07120Service.get07120sList(param);
	}

	// 승인요청, 승인, 반려, 승인취소 업데이트
	@PostMapping(value = "/updateFndsCnstDecd")
	public int updateFndsCnstDecd(@RequestBody TB07120SVO param) {
		return tb07120Service.updateFndsCnstDecd(param);
	}
}
