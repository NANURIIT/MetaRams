package com.nanuri.rams.business.assessment.tb08.tb08036;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.dto.IBIMS611BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB08036S")
@RequiredArgsConstructor
@RestController
public class TB08036APIController {
	
	private final TB08036Service tb08036Service;
	
	@GetMapping(value = "/getDealInfoTB08036S")
	public IBIMS601BVO getDealInfo(IBIMS601BVO param){
		return tb08036Service.getDealInfo(param);
	}
	
	@PostMapping(value = "/modifyDealInfoTB08036S")
	public int modifyDealInfo(@RequestBody IBIMS601BVO param){
		System.out.println("Received param: " + param);

		return tb08036Service.modifyDealInfo(param);

	}
	
	@PostMapping(value = "/insertIBIMS603B")
	public int insertIBIMS603B(@RequestBody IBIMS603BDTO param){
		return tb08036Service.insertIBIMS603B(param);
	}

	@PostMapping(value = "/insertIBIMS602B")
	public int insertIBIMS602B(@RequestBody IBIMS602BDTO param){
		return tb08036Service.insertIBIMS602B(param);
	}

	// @PostMapping(value = "/insertIBIMS611B")
	// public IBIMS611BDTO insertIBIMS611B(@RequestBody IBIMS611BDTO param){
	// 	return tb08036Service.insertIBIMS611B(param);
	// }

	@PostMapping(value = "/deleteDealInfoTB08036S")
	public int deleteDealInfo(@RequestBody IBIMS601BVO param){		
		return tb08036Service.deleteDealInfo(param);
	}

	@PostMapping(value = "/deleteIBIMS602B")
	public int deleteIBIMS602B(@RequestBody IBIMS601BVO param){		
		return tb08036Service.deleteIBIMS602B(param);
	}
	
	// @PostMapping(value = "/deleteIBIMS611B")
	// public IBIMS601BVO deleteIBIMS611B(@RequestBody IBIMS601BVO param){		
	// 	return tb08036Service.deleteIBIMS611B(param);
	// }

	@PostMapping(value = "/deleteIBIMS603B")
	public int deleteIBIMS603B(@RequestBody IBIMS601BVO param){		
		return tb08036Service.deleteIBIMS603B(param);
	}

}
