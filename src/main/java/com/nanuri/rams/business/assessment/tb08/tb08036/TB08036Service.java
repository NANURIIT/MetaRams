package com.nanuri.rams.business.assessment.tb08.tb08036;



import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS601BVO;


@Service
public interface TB08036Service {

	IBIMS601BVO getDealInfo(IBIMS601BVO param);

	void modifyDealInfo(IBIMS601BVO param);

	void deleteDealInfo(IBIMS601BVO param);
	
}