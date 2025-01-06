package com.nanuri.rams.business.assessment.tb06.tb06082;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB06082P")
@RequiredArgsConstructor
@RestController
public class TB06082APIController {

	private final TB06082Service tb06082Service;

	@PostMapping("/decdUpdate")
	public int decdUpdate(@RequestBody IBIMS231BVO paramData) {
		return tb06082Service.decdUpdate(paramData);
	}
	
	
}
