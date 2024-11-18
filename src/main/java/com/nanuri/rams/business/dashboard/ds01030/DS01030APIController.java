package com.nanuri.rams.business.dashboard.ds01030;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.DS01030SVO;
import com.nanuri.rams.business.common.vo.DS01030SVO.Parameters;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/DS01030S")
@RequiredArgsConstructor
@RestController
public class DS01030APIController {
	
	private final DS01030Service ds01030Service;
	
	@GetMapping(value = "/getData")
	public List<Parameters> getData(DS01030SVO.Parameters param) {
		return ds01030Service.getData(param);
	}
	

}
