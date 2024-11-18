package com.nanuri.rams.business.assessment.tb08.tb08020;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RequestMapping("/TB08020S")
@RequiredArgsConstructor
@RestController
public class TB08020APIController {

	private final TB08020Service tb08020Service;

	@GetMapping(value = "/getDealMnrtList")
	public List<HashMap<String, String>> getDealMnrtList(@RequestParam HashMap<String, String> paramData) {

		List<HashMap<String, String>> rtnVal = tb08020Service.getDealMnrtList(paramData);

		return rtnVal;
	}

}
