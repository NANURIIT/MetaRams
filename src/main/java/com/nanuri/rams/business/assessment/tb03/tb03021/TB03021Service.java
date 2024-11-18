package com.nanuri.rams.business.assessment.tb03.tb03021;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS101BVO;

@Service
public interface TB03021Service {

	// 안건목록조회
	List<IBIMS101BVO> getDealInfo(IBIMS101BVO param);

	// 딜변경이력sn조회
	List<IBIMS101BVO> getDealSnHis(IBIMS101BVO param);
	
}
