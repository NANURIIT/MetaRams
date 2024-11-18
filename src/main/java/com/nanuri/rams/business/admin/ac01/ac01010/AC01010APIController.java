package com.nanuri.rams.business.admin.ac01.ac01010;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AC01010S")
@RequiredArgsConstructor
@RestController
public class AC01010APIController {
	
	private final AC01010Service service;
	
	@GetMapping(value = "/commonCodeInfo")
	public List<IBIMS001BVO> getCommonCodeInfo() {
		return service.getCommonCodeName();
	}
	
	// 그룹코드정보 리스트 가져오기
	@GetMapping(value = "/groupCodeInfoList")
	public List<IBIMS001BVO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
		return service.getGroupCodeInfoList(cmnsCdGrp);
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
	public boolean registGroupCodeInfo(@RequestBody List<IBIMS001BVO> requestDtos) {
		return service.registGroupCodeInfo(requestDtos);
	}

	// 코드정보 등록하기
	@PostMapping(value = "/registCodeInfo")
	public boolean registCodeInfo(@RequestBody List<IBIMS002BVO> requestDtos) {
		return service.registCodeInfo(requestDtos);
	}

}
