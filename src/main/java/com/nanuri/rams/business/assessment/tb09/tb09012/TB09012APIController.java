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

	@GetMapping(value = "/selectIBIMS754B")
	public List<IBIMS754BDTO> selectIBIMS754B(TB09012SVO param) {
		return tb09012service.selectIBIMS754B(param);
	}

	@GetMapping(value = "/selectIBIMS755B")
	public List<IBIMS754BDTO> selectIBIMS755B(TB09012SVO param) {
		return tb09012service.selectIBIMS755B(param);
	}

	@GetMapping(value = "/selectIBIMS756B")
	public List<IBIMS754BDTO> selectIBIMS756B(TB09012SVO param) {
		return tb09012service.selectIBIMS756B(param);
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
