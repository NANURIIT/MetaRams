package com.nanuri.rams.business.assessment.tb05.tb05040;

import com.nanuri.rams.business.common.CommonService;
import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;
import com.nanuri.rams.business.common.vo.TB05040SVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/TB05040S")
@RequiredArgsConstructor
@RestController
public class TB05040Controller {

	private final TB05040Service tb05040Service;
	private final CommonService commonService;

	// Deal 목록 조회
	@GetMapping(value = "/getDealList")
	public List<IBIMS103BVO> getDealList(IBIMS103BVO paramData) {
		return tb05040Service.getDealList(paramData);
	}

	@GetMapping(value = "/getDealDetail")
	public TB05040SVO getDealDetail(IBIMS103BDTO dealDto) {
		return tb05040Service.getDealDetail(dealDto);
	}

	
}
