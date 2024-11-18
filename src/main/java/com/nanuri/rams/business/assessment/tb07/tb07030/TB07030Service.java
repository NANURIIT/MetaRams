package com.nanuri.rams.business.assessment.tb07.tb07030;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.TB07030SVO;

@Service
public interface TB07030Service {

	public List<IBIMS403BVO> getRdmpList(IBIMS403BDTO paramData);

	//public int saveBuyInfo(IBIMS405BDTO paramData);

	// 실행정보 상세내역 조회
	public TB07030SVO getRdmpDetail(TB07030SVO paramData);

	public int saveRdpm(TB07030SVO paramData);

	public TB07030SVO getExchR(String paramData);

}
