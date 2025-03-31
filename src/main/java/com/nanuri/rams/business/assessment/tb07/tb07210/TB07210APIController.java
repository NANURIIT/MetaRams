package com.nanuri.rams.business.assessment.tb07.tb07210;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07210S")
@RequiredArgsConstructor
@RestController
public class TB07210APIController {

	private final TB07210Service tb07210Service;

	/**
	 * 승인내역조회
	 * @param param
	 * @return
	 */
	@PostMapping("/selectSpcList")
	public List<IBIMS900BVO> selectSpcList(@RequestBody IBIMS900BVO param) {
		return tb07210Service.selectSpcList(param);
	}
	

	/**
	 * 승인내역상세조회
	 * @param param
	 * @return
	 */
	@PostMapping(value = "/spcDecdDetail")
	public IBIMS232BVO spcDecdDetail(@RequestBody IBIMS232BVO param) {
		return tb07210Service.spcDecdDetail(param);
	}

}
