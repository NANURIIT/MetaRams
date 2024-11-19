package com.nanuri.rams.business.assessment.tb05.tb05030;

import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import com.nanuri.rams.business.common.vo.TB05030SVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/TB05030S")
@RequiredArgsConstructor
@RestController
public class TB05030Controller {

	private final TB05030Service tb05030Service;
	
	// 안건정보 검색
	@GetMapping(value = "/getCASEInfo")
	public List<TB05030SVO> getCASEInfo(@RequestParam Map<String, Object> paramData) {
		return tb05030Service.getCASEInfo(paramData);
	}
	
	// 의결내용 검색
	@GetMapping(value = "/getMMBRInfo")
	public List<IBIMS115BVO> getMMBRInfo(@RequestParam Map<String, Object> paramData) {
		return tb05030Service.getMMBRInfo(paramData);
	}
	
	// 협의결과 검색
	@GetMapping(value = "/getIBDEALInfo")
	public List<TB05030SVO> getIBDEALInfo(@RequestParam Map<String, Object> paramData) { return tb05030Service.getIBDEALInfo(paramData); }
	
	// 의결내용 업데이트
	@PostMapping(value = "/updateMMBRInfo")
	public int updateMMBRInfo(@RequestBody List<Map<String, Object>> paramData) { return tb05030Service.updateMMBRInfo(paramData); }

	// 협의결과 업데이트
	@PostMapping(value = "/updateIBDEALInfo")
	public int updateIBDEALInfo(@RequestBody Map<String, Object> paramData) { return tb05030Service.updateIBDEALInfo(paramData); }








	// 안건 - 안건제외 -> 안쓰는 기능
	// @PostMapping(value = "/deleteRAA22BDeal")
	// public int deleteRAA22BDeal(@RequestBody List<Map<String, Object>> inputList) { return tb05030Service.deleteRAA22BDeal(inputList); }

}
