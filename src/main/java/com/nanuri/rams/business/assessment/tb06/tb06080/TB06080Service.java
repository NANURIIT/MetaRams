package com.nanuri.rams.business.assessment.tb06.tb06080;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS231BDTO;
import com.nanuri.rams.business.common.vo.IBIMS231BVO;
import com.nanuri.rams.business.common.vo.IBIMS232BVO;

@Service
public interface TB06080Service {
	
	// 승인요청내역 조회
	public List<IBIMS231BVO> inqTB06080S(IBIMS231BDTO paramData);

	// 결재정보 조회
	public List<IBIMS232BVO> dcfcList(IBIMS231BDTO paramData);

}
