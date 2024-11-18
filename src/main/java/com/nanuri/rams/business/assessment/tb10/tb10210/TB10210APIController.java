package com.nanuri.rams.business.assessment.tb10.tb10210;

import com.nanuri.rams.business.common.dto.IBIMS006BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.menuUpdateRequestVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
public class TB10210APIController {
	
	private final TB10210Service service;
	
	@GetMapping(value = "/getAuthCode")
	public List<IBIMS006BVO> getAuthCode(String rghtCdNm) throws ParseException {
		return service.getAuthCode(rghtCdNm);
	}

	@GetMapping(value = "/getAuthCodeMenu")
	public List<IBIMS005BVO> getAuthCodeMenu(String rghtCd) {
		return service.getAuthCodeMenu(rghtCd);
	}

	@PostMapping(value = "/registerAuthCode")
	public boolean registerAuthCode(@RequestBody List<IBIMS006BVO> requestDtos) {
		return service.registerAuthCode(requestDtos);
	}

	@PatchMapping(value = "/deleteAuthCode")
	public boolean deleteAuthCode(@RequestBody List<String> rghtCd) {
		return service.deleteAuthCode(rghtCd);
	}

	@PostMapping(value = "/registerAuthCodeMenu")
	public boolean registerAuthCodeMenu(@RequestBody List<menuUpdateRequestVO> voList) {
		return service.registerAuthCodeMenu(voList);
	}

	@PostMapping(value = "/TB10210S/mergeAthCd")
	public int mergeAthCd(@RequestBody List<IBIMS006BDTO> param) {
		return service.mergeAthCd(param);
	}

	@PostMapping(value = "/TB10210S/updateMdfyRghtCcd")
	public int updateMdfyRghtCcd(@RequestBody List<IBIMS007BDTO> param) {
		return service.updateMdfyRghtCcd(param);
	}
	

}
