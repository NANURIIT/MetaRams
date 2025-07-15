package com.nanuri.rams.business.assessment.tb09.tb09014;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS753BVO;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Service
public interface TB09014Service {

	public List<IBIMS753BVO> getMrtgFcsList(IBIMS753BVO params);
	
	public List<IBIMS753BVO> getMsgTransList(IBIMS753BVO params);
	
	public List<IBIMS753BVO> getErrDpchTabList(IBIMS753BVO params);
	
	public int saveMrtgFcsList(IBIMS753BVO params);
	
	public int saveMsgTransList(IBIMS753BVO params);
	
	public int saveErrDpchList(IBIMS753BVO params);

}