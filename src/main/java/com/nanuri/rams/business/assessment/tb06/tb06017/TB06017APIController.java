package com.nanuri.rams.business.assessment.tb06.tb06017;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB06013PVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06017P")
@RequiredArgsConstructor
@RestController
public class TB06017APIController {

	private final TB06017Service tb06017Service;

	// 담보정보 리스트 조회
	@GetMapping(value = "/getMrtgInfo")
	public List<TB06013PVO> getMrtgInfo(TB06013PVO searchParam) {
		return tb06017Service.getMrtgInfo(searchParam);
	}

	// 담보정보 상세조회
	@GetMapping(value = "/mrtgInfoDetails")
	public TB06013PVO mrtgInfoDetails(TB06013PVO searchParam) {
		return tb06017Service.mrtgInfoDetails(searchParam);
	}

	// 담보정보 연결
	@PostMapping(value = "/connectMtrt")
	public int connectMtrt(TB06013PVO searchParam) {
		return tb06017Service.connectMtrt(searchParam);
	}

}
