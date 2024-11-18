package com.nanuri.rams.business.assessment.as04.as04210;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.xalan.lib.sql.ObjectArray;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.RAA21BVO.AS04110SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS04210S")
@RequiredArgsConstructor
@RestController
public class AS04210Controller {

	private final AS04210Service as04210Service;
	
	// 안건정보 검색
	@GetMapping(value = "/getCASEInfo")
	public List<CASEInfo> getCASEInfo(SearchVO paramData) {
		return as04210Service.getCASEInfo(paramData);
	}
	
	// 의결내용 검색
	@GetMapping(value = "/getMMBRInfo")
	public List<MMBRInfo> getMMBRInfo(SearchVO paramData) {
		return as04210Service.getMMBRInfo(paramData);
	}
	
	// 협의결과 검색
	@GetMapping(value = "/getIBDEALInfo")
	public List<IBDEALInfo> getIBDEALInfo(SearchVO paramData) {
		return as04210Service.getIBDEALInfo(paramData);
	}
	
	// 임시저장 - 기본정보
	@ResponseBody
	@PostMapping(value = "/saveRAA23BInfo")
	public void saveRAA23BInfo(@RequestBody List<Map<String, Object>> param) {
		as04210Service.saveRAA23BInfo(param);
	}

	// 임시저장 - 기본정보
	@PostMapping(value = "/updateIBDEALInfo")
	public int updateIBDEALInfo(IBDEALInfo param) {
		return as04210Service.updateIBDEALInfo(param);
	}

	// 안건 - 안건제외
	@PostMapping(value = "/deleteRAA22BDeal")
	public int deleteRAA22BDeal(@RequestBody List<Map<String, Object>> inputList) { return as04210Service.deleteRAA22BDeal(inputList); }

}
