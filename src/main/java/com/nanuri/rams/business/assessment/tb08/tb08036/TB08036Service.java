package com.nanuri.rams.business.assessment.tb08.tb08036;



import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS603BDTO;
import com.nanuri.rams.business.common.vo.IBIMS601BVO;


@Service
public interface TB08036Service {
	// pf사후관리 조회
	IBIMS601BVO getDealInfo(IBIMS601BVO param);
	
	// 분양수지관리 등록
	void modifyDealInfo(IBIMS601BVO param);
  // 분양수지관리 삭제
	void deleteDealInfo(IBIMS601BVO param);

	// 기타사후관리 등록
	void insertIBIMS603B(IBIMS603BDTO param);

	void deleteIBIMS603B(IBIMS601BVO param);


	
}