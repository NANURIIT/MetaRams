package com.nanuri.rams.business.assessment.tb05.tb05030;

import com.nanuri.rams.business.common.vo.AS04210SVO.CASEInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.IBDEALInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.MMBRInfo;
import com.nanuri.rams.business.common.vo.AS04210SVO.SearchVO;
import com.nanuri.rams.business.common.vo.IBIMS115BVO;
import com.nanuri.rams.business.common.vo.TB05030SVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface TB05030Service {

	List<TB05030SVO> getCASEInfo(Map<String, Object> paramData);

	List<IBIMS115BVO> getMMBRInfo(Map<String, Object> paramData);

	List<TB05030SVO> getIBDEALInfo(Map<String, Object> paramData);

	int updateMMBRInfo(List<Map<String, Object>> paramData);

	int updateIBDEALInfo(Map<String, Object> paramData);

	// int deleteRAA22BDeal(List<Map<String, Object>> inputList);

}
