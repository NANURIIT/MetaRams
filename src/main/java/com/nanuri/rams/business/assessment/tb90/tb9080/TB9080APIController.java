package com.nanuri.rams.business.assessment.tb90.tb9080;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB9080B")
@RequiredArgsConstructor
@RestController
public class TB9080APIController {

	private final TB9080Service tb9080Service;

	@PostMapping(value = "/insert")
	public String insert(@RequestBody IBIMS997BDTO param) {
		return tb9080Service.insert(param);
	}

}
