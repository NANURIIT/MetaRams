package com.nanuri.rams.business.assessment.tb07.tb07140;


import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS407BDTO;
import com.nanuri.rams.business.common.vo.IBIMS407BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07140S")
@RequiredArgsConstructor
@RestController
public class TB07140APIController {
	
	private final TB07140Service tb07140Service;

	// @PostMapping(value = "/getChngBfInfo")
	// public TB07150SVO getChngBfInfo(@RequestBody TB07150SVO paramData){
	// 	return tb07150Service.getChngBfInfo(paramData);
	// }

	@PostMapping(value = "/getFincList")
	public List<IBIMS407BVO> getFincList(@RequestBody IBIMS407BDTO paramData) {
		return tb07140Service.getFincList(paramData);
	}
	
	@PostMapping(value = "/insertFinc")
	public int insertFinc(@RequestBody IBIMS407BDTO paramData){
		return tb07140Service.insertFinc(paramData);
	};

	@PostMapping(value = "/updateFinc")
	public int updateFinc(@RequestBody IBIMS407BDTO paramData){
		return tb07140Service.updateFinc(paramData);
	};

	@PostMapping(value = "/deleteFinc")
	public int deleteFinc(@RequestBody IBIMS407BDTO paramData){
		return tb07140Service.deleteFinc(paramData);
	};
}
