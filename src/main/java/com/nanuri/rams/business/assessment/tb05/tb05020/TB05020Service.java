package com.nanuri.rams.business.assessment.tb05.tb05020;

import com.nanuri.rams.business.common.dto.IBIMS115BDTO;
import com.nanuri.rams.business.common.dto.RAA23BDTO;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.AS04220SVO.DealInfo;
import com.nanuri.rams.business.common.vo.TB05020SVO;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Service
public interface TB05020Service {

	List<TB05020SVO> getDealInfoByEno(String chkF);

	int confirmFile(RAA23BDTO param);

	int updateAprvOppsDcd(IBIMS115BDTO paramData);

}
