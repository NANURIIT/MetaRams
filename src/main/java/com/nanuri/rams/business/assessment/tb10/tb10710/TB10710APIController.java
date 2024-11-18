package com.nanuri.rams.business.assessment.tb10.tb10710;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import com.nanuri.rams.business.common.vo.IBIMS981BVO;

import java.util.List;

@Slf4j
@RequestMapping("/TB10710S")
@RequiredArgsConstructor
@RestController
public class TB10710APIController {

	private final TB10710Service tb10710Service;

	//	기일관리 정보
	@PostMapping(value = "/selectIBIMS981B")
	public List<IBIMS981BVO> selectIBIMS981B(@RequestBody IBIMS981BVO param) {
		return tb10710Service.selectIBIMS981B(param);
	}

}
