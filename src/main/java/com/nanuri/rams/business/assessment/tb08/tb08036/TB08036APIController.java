package com.nanuri.rams.business.assessment.tb08.tb08036;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
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
	public void modifyDealInfo(@RequestBody IBIMS601BVO param){
		tb08036Service.modifyDealInfo(param);
	}
	
	@PostMapping(value = "/deleteDealInfoTB08036S")
	public void deleteDealInfo(@RequestBody IBIMS601BVO param){		
		tb08036Service.deleteDealInfo(param);
	}

	//기타사후관리
	@PostMapping(value = "/insertIBIMS603B")
	public void insertIBIMS603B(@RequestBody IBIMS603BDTO param){
    tb08036Service.insertIBIMS603B(param);
	}

	@PostMapping(value = "/deleteIBIMS603B")
	public void deleteIBIMS603B(@RequestBody IBIMS601BVO param){
		System.out.println("Received param: " + param);
    tb08036Service.deleteIBIMS603B(param);
	}

}
