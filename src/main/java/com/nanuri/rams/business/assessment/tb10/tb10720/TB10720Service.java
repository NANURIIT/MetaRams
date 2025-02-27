package com.nanuri.rams.business.assessment.tb10.tb10720;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS998BVO;

@Service
public interface TB10720Service {

	// 마감기본 영업일 기준 조회
	public IBIMS998BVO selectTB10720S(IBIMS998BVO input);

	// 마감관리 개시/마감 실행
	public int updateTB10720S(IBIMS998BVO input);

	public void daliyWorkStart();

	public void daliyWorkEnd();

}
