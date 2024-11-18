package com.nanuri.rams.business.assessment.tb06.tb06070;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS200BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
//import com.nanuri.rams.business.common.dto.IBIMS200BDTO;
import com.nanuri.rams.business.common.vo.TB06070SVO;

@Service
public interface TB06070Service {
	/**
	 * 상품정보 팝업 조회
	 */
	public List<IBIMS200BDTO> getResultData(TB06070SVO param);
	/**
	 * 상품정보 상세 조회
	 */
	public TB06070SVO getDetailInfo(TB06070SVO param);

}
