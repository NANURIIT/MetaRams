package com.nanuri.rams.business.assessment.as04.as04210;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;

@Service
public interface AS04210Service {

	List<CASEInfo> getCASEInfo(SearchVO paramData);

	List<MMBRInfo> getMMBRInfo(SearchVO paramData);

	List<IBDEALInfo> getIBDEALInfo(SearchVO paramData);

	void saveRAA23BInfo(List<Map<String, Object>> param);

	int updateIBDEALInfo(IBDEALInfo param);

	int deleteRAA22BDeal(List<Map<String, Object>> inputList);

}
