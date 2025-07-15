package com.nanuri.rams.business.assessment.tb09.tb09013;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS752BVO;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Service
public interface TB09013Service {

	public List<IBIMS752BVO> getLmtFcssList(IBIMS752BVO params);
	
	public List<IBIMS752BVO> getMsgTransList(IBIMS752BVO params);
	
	public List<IBIMS752BVO> getErrDpchTabList(IBIMS752BVO params);
	
	public int saveLmtFcssList(IBIMS752BVO params);
	
	public int saveMsgTransList(IBIMS752BVO params);
	
	public int saveErrDpchList(IBIMS752BVO params);

}