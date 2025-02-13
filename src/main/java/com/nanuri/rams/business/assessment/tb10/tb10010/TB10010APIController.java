package com.nanuri.rams.business.assessment.tb10.tb10010;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RequestMapping("/TB10010S")
@RequiredArgsConstructor
@RestController
public class TB10010APIController {
	
	private final TB10010Service service;
	
	@GetMapping(value = "/commonCodeInfo")
	public List<IBIMS001BVO> getCommonCodeInfo() {
		return service.getCommonCodeName();
	}
	
	// 그룹코드정보 리스트 가져오기
	@PostMapping(value = "/groupCodeInfoList")
	public List<IBIMS001BVO> getGroupCodeInfoList(@RequestBody IBIMS001BDTO paramData) throws ParseException {
		return service.getGroupCodeInfoList(paramData);
	}

	@GetMapping(value = "/groupCodeInfo")
	public List<IBIMS002BVO> getGroupCodeInfo(String cmnsCdGrp) throws ParseException {
		return service.getCodeInfoList(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteGroupCodeInfo")
	public boolean deleteGroupCodeInfo(@RequestBody List<String> cmnsCdGrp) {
		return service.deleteGroupCodeInfo(cmnsCdGrp);
	}

	@PatchMapping(value = "/deleteCodeInfo")
	public boolean deleteCodeInfo(@RequestBody IBIMS002BVO requestDto) {
		return service.deleteCodeInfo(requestDto);
	}

	// 그룹코드정보 등록하기
	@PostMapping(value = "/registGroupCodeInfo")
	public boolean registGroupCodeInfo(@RequestBody IBIMS001BVO paramData) {
		return service.registGroupCodeInfo(paramData);
	}

	// 코드정보 등록하기
	@PostMapping(value = "/registCodeInfo")
	public boolean registCodeInfo(@RequestBody IBIMS002BVO paramData) {
		return service.registCodeInfo(paramData);
	}

}
