package com.nanuri.rams.business.assessment.tt30.tt3040;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.tt.TT03040SDTO;
import com.nanuri.rams.business.common.tt.TT03040SVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/TT03040S")
@RequiredArgsConstructor
@RestController
public class TT03040APIController {
	private final TT03040Service tt03040Service;

	@GetMapping(value="/ibSpecSearch")
	public List<TT03040SVO> ibSpecSearch(TT03040SDTO data) {
		return tt03040Service.ibSpecSearch(data);
	}
}
