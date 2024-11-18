package com.nanuri.rams.business.assessment.as05.as05110;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.RAA21BVO.CASEVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/AS05110S")
@RequiredArgsConstructor
@RestController
public class AS05110Controller {
	
	private final AS05110Service as05110Service;
	
	// 안건조회
	@GetMapping(value = "/getDealDetails")
	public List<CASEVO> getDealDetail(CASEVO paramData) {
		return as05110Service.getDealDetails(paramData);
	}
	
	// 담당자/심사역 일괄변경
	@ResponseBody
	@PostMapping(value = "/savePEno")
	public void savePEno(@RequestBody List<Map<String, Object>> param) {
		as05110Service.savePEno(param);
	}

}
