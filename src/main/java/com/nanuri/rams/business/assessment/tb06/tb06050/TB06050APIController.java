package com.nanuri.rams.business.assessment.tb06.tb06050;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.nanuri.rams.business.common.vo.IBIMS206BVO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@RequestMapping("/TB06050S")
@RequiredArgsConstructor
@RestController
public class TB06050APIController {

	private final TB06050Service tb06050Service;

	@PostMapping("/getSPPIData")
	public List<IBIMS206BVO> getSPPIData(@RequestBody IBIMS206BVO param){
		return tb06050Service.getSPPIData(param);
	};

	@PostMapping("/insertSPPIData")
    public int insertSPPIData(@RequestBody IBIMS206BVO param){
		return tb06050Service.insertSPPIData(param);
	};

	@PostMapping("/updateSPPIData")
    public int updateSPPIData(@RequestBody IBIMS206BVO param){
		return tb06050Service.updateSPPIData(param);
	};

}
