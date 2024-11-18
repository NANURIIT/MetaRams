package com.nanuri.rams.business.assessment.tb07.tb07150;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07150S")
@RequiredArgsConstructor
@RestController
public class TB07150APIController {
	
	private final TB07150Service tb07150Service;

	// @PostMapping(value = "/getChngBfInfo")
	// public TB07150SVO getChngBfInfo(@RequestBody TB07150SVO paramData){
	// 	return tb07150Service.getChngBfInfo(paramData);
	// }

	@PostMapping(value = "/getCndChngLdgInf")
	public TB07150SVO getCndChngLdgInf(@RequestBody TB07150SVO paramData) {
		return tb07150Service.getCndChngLdgInf(paramData);
	}


	//조건변경
	@PostMapping(value = "/cndChng")
	public int cndChng(@RequestBody TB07150SVO param) {
		return tb07150Service.cndChng(param);
	}
	
}
