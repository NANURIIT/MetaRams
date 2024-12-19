package com.nanuri.rams.business.assessment.tb07.tb07180;

import java.util.List;

import org.springframework.stereotype.Service;
import com.nanuri.rams.business.common.dto.IBIMS421BDTO;


@Service
public interface TB07180Service {

	public List<IBIMS421BDTO> IBIMS421BSelect(String feeName);
	
	public int IBIMS421BInsert(IBIMS421BDTO param);

	public int IBIMS421BUpdate(IBIMS421BDTO param);
	
	public int IBIMS421BSave(IBIMS421BDTO param);

	public int IBIMS421BDelete(IBIMS421BDTO param);

}
