package com.nanuri.rams.business.assessment.tb03.tb03030;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS102BDTO;

@Service
public interface TB03030Service {
	
	// 기업등록
	public int registRmInfo(IBIMS102BDTO registInfo);
	
	// RM이름조회
	public List<IBIMS102BDTO> getEntpInfoByNm(IBIMS102BDTO entpInfoNm);
	
	// RM활동조회
	public List<IBIMS102BDTO> getHistoryInfo(IBIMS102BDTO rmInfo);
	
	// RM활동이력조회
	public List<IBIMS102BDTO> rmHistoryInfo(IBIMS102BDTO rmHistoryInfo);
	
	// RM활동수정
	public int updateHistory(IBIMS102BDTO registInfo);
	
	// File Upload Key
	public List<IBIMS102BDTO> getFileKey(IBIMS102BDTO registInfo);
}
