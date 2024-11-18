package com.nanuri.rams.business.assessment.tb06.tb06060;


import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import com.nanuri.rams.business.common.vo.IBIMS111BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@RequestMapping("/TB06060S")
@RequiredArgsConstructor
@RestController
public class TB06060APIController {
	
	private final TB06060Service tb06060Svc;

	// 조회
	@PostMapping("/getWorkflowInfoList")
	public List<IBIMS101BVO> getWorkflowInfoList(@RequestBody IBIMS101BVO param) {
		return tb06060Svc.getWorkflowInfoList(param);
	}

	@PostMapping("/getWorkflowDetail")
	public IBIMS111BVO getWorkflowDetail(@RequestBody IBIMS111BVO param) {
		return tb06060Svc.getWorkflowDetail(param);
	}

}