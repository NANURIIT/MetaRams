package com.nanuri.rams.business.assessment.tb03.tb06019;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepListVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.SchCondVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepCdVO;

import lombok.RequiredArgsConstructor;

@RequestMapping("/TB06019P")
@RequiredArgsConstructor	
@RestController
public class TB06019APIController {
	
	private final TB06019Service TB06019Service;
	
	// 기업체 정보 조회
	@GetMapping(value = "/getArdyBzepInfo")
	public ArdyBzepVO getArdyBzepInfo(SchCondVO schVo) {				
		return TB06019Service.getArdyBzepInfo(schVo);
	}
	
	// 기업체 정보 목록 조회
	@GetMapping(value = "/getArdyBzepInfoList")
	public List<ArdyBzepListVO> getArdyBzepInfoList(SchCondVO schVo) {
		return TB06019Service.getArdyBzepInfoList(schVo);
	}

	// 기업체 정보 등록/수정/사용여부 수정 처리
	@PostMapping(value = "/saveArdyBzepInfo")
	public SchCondVO saveArdyBzepInfo(ArdyBzepVO saveVo) {
		return TB06019Service.saveArdyBzepInfo(saveVo);
	}

	// 기업체 정보 사용여부 수정
	@PostMapping(value = "/deleteArdyBzepInfo")
	public int deleteArdyBzepInfo(ArdyBzepVO saveVo) {
		return TB06019Service.deleteArdyBzepInfo(saveVo);
	}

	// 기업체 사용여부 코드값
	@GetMapping(value = "/getArdyBzepCd")
	public List<ArdyBzepCdVO> getArdyBzepCd(SchCondVO schVo) {				
		return TB06019Service.getArdyBzepCd(schVo);
	}
}
