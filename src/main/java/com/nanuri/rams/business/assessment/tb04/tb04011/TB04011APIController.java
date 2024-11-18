package com.nanuri.rams.business.assessment.tb04.tb04011;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04011P")
@RequiredArgsConstructor
@RestController
public class TB04011APIController {

	private final TB04011Service tb04011Service;
	//private final CommonService commonService;

	// 안건목록조회
	@GetMapping(value = "/getDealInfo")
	public List<IBIMS103BVO> getDealInfo(IBIMS103BVO paramData) {
		return tb04011Service.getDealInfo(paramData);
	}
	
}
