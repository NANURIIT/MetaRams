package com.nanuri.rams.business.assessment.tb09.tb09012;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS754BDTO;
import com.nanuri.rams.business.common.vo.IBIMS754BVO;
import com.nanuri.rams.business.common.vo.TB09012SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * 
 */
@Slf4j
@RequestMapping("/TB09012S")
@RequiredArgsConstructor
@RestController
public class TB09012APIController {

	private final TB09012Service tb09012service;

	@GetMapping(value = "/cpdgSearch")
	public List<IBIMS754BDTO> cpdgSearch(TB09012SVO param) {
		return tb09012service.cpdgSearch(param);
	}

	@GetMapping(value = "/cpdgTransSearch")
	public List<IBIMS754BDTO> cpdgTransSearch(TB09012SVO param) {
		return tb09012service.cpdgTransSearch(param);
	}

	@GetMapping(value = "/cpdgErrSearch")
	public List<IBIMS754BDTO> cpdgErrSearch(TB09012SVO param) {
		return tb09012service.cpdgErrSearch(param);
	}

	@PostMapping(value = "/saveCpdgList")
	public int saveCpdgList(@RequestBody IBIMS754BVO param) {

		return tb09012service.saveCpdgList(param);
	}

	@PostMapping(value = "/saveTransList")
	public int saveTransList(@RequestBody IBIMS754BVO param) {

		return tb09012service.saveTransList(param);
	}

	@PostMapping(value = "/saveErrList")
	public int saveErrList(@RequestBody IBIMS754BVO param) {

		return tb09012service.saveErrList(param);
	}

}
