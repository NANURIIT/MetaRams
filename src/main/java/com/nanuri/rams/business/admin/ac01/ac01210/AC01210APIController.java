package com.nanuri.rams.business.admin.ac01.ac01210;

import java.text.ParseException;
import java.util.List;

import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.menuUpdateRequestVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01210APIController {
	
	private final AC01210Service service;
/*
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
 */

}
