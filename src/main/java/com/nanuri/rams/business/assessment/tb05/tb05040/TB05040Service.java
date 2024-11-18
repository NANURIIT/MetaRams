package com.nanuri.rams.business.assessment.tb05.tb05040;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.AS04010SVO;
import com.nanuri.rams.business.common.vo.TB05040SVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface TB05040Service {

	// Deal 목록 조회
	List<IBIMS103BVO> getDealList(IBIMS103BVO paramData);

	// Deal 목록 조회
	TB05040SVO getDealDetail(IBIMS103BDTO dealDto);

}
