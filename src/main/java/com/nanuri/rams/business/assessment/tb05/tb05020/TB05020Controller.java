package com.nanuri.rams.business.assessment.tb05.tb05020;

import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;
import com.nanuri.rams.business.common.vo.TB05020SVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/TB05020S")
@RequiredArgsConstructor
@RestController
public class TB05020Controller {

	private final TB05020Service tb05020Service;

	@GetMapping(value = "/getDealInfoByEno")
	public List<TB05020SVO> getDealInfoByEno(@RequestParam String chkF) {
		return tb05020Service.getDealInfoByEno(chkF);
	}

	@PostMapping(value = "/confirmFile")
	public int confirmFile(RAA23BDTO param) {
		return tb05020Service.confirmFile(param);
	}
	
	@PostMapping(value = "/updateAprvOppsDcd")
	public int updateAprvOppsDcd(IBIMS115BDTO paramData) {
		return tb05020Service.updateAprvOppsDcd(paramData);
	}
	
	
	
}
