package com.nanuri.rams.business.assessment.tb07.tb07060;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;

@Service
public interface TB07060Service {

	// 여신원장조회
	public IBIMS401BVO srchCrdlLdg(IBIMS401BVO input);
	
	// 여신원장 실행순번 조회
	List<Map<String, Object>> srchExcSn(IBIMS401BDTO input);

	// 거래내역 조회
	public IBIMS410BVO inqTrDtls(IBIMS410BDTO input);

	// 실행원장 조회
	public IBIMS402BVO inqExcLdg(IBIMS402BVO input);
}
