package com.nanuri.rams.business.assessment.mo44.mo44040;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA31BDTO;
import com.nanuri.rams.business.common.vo.MO44040SVO;
import com.nanuri.rams.business.common.vo.MO44040SVO.DealInfo;

/**
 * MO44040Service
 */
@Service
public interface MO44040Service {

	List<MO44040SVO.DealInfo> getInfo(MO44040SVO.SearchParam searchParam);

	void savePlans(MO44040SVO.DealInfo paramData);

	void savePFRM(MO44040SVO.DealInfo paramData);

	void savePrgrs(RAA31BDTO paramData);
	
}