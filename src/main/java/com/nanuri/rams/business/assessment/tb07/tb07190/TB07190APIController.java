package com.nanuri.rams.business.assessment.tb07.tb07190;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS420BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TB07190S")
@RequiredArgsConstructor
@RestController
public class TB07190APIController {

	private final TB07190Service tb07190Service;

	@PostMapping(value = "/getTB07190SData")
	public List<IBIMS420BVO> getTB07190SData(@RequestBody IBIMS420BVO param) {
		return tb07190Service.getTB07190SData(param);
	}

}
