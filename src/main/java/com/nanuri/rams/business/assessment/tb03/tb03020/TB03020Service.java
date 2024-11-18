package com.nanuri.rams.business.assessment.tb03.tb03020;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;

@Service
public interface TB03020Service {

	//public String getDealMngNo();

	public IBIMS101BVO getBscDealDetail(IBIMS101BDTO dealInfo);

	public String saveDeal(IBIMS101BDTO dealInfo);

	public int reqApproveDeal(IBIMS100BVO.selectVO toDoInfo);

	public int cnfmDeal(IBIMS101BDTO dealInfo);

	public int rejtDeal(String mngDealNo);
	
	public String getDealNo();
}
