package com.nanuri.rams.business.assessment.tb04.tb04030;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB04030S")
@RequiredArgsConstructor
@RestController
public class TB04030APIController {

	private final TB04030Service tb04030Service;

	// 배정안건조회
	@GetMapping(value = "/assignmentSearch")
	public List<IBIMS103BVO> assignmentSearch(TB04020SVO param) {
		return tb04030Service.assignmentSearch(param);
	}

}
