package com.nanuri.rams.business.assessment.tb09.tb09040;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.TB09040SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * TB09040SController
 */
@Slf4j
@RequestMapping("/TB09040S")
@RequiredArgsConstructor
@RestController
public class TB09040Controller {
	
	private final TB09040Service tb09040service;
	
	@GetMapping(value = "/getDealInfo")
	public List<TB09040SVO>getDealInfo(TB09040SVO param) {
		return tb09040service.getDealInfo(param);
	}
}

