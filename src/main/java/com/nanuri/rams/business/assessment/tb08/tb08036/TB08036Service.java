package com.nanuri.rams.business.assessment.tb08.tb08036;



import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS602BDTO;
import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.dto.IBIMS611BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;


@Service
public interface TB08036Service {
	// pf사후관리 조회
	IBIMS601BVO getDealInfo(IBIMS601BVO param);
	
	// 분양수지관리 등록
	void modifyDealInfo(IBIMS601BVO param);
	// 월별사업관리 등록
	void insertIBIMS602B(IBIMS602BDTO param);
	// 기타사후관리 등록
	void insertIBIMS603B(IBIMS603BDTO param);
  // 분양수지관리 삭제
	void deleteDealInfo(IBIMS601BVO param);
  // 기타사후관리 삭제
	void deleteIBIMS602B(IBIMS601BVO param);
	  // 기타사후관리 삭제
	void deleteIBIMS611B(IBIMS601BVO param);
		  // 기타사후관리 삭제
	void deleteIBIMS603B(IBIMS601BVO param);

	void insertIBIMS611B(IBIMS611BDTO param);


	
}