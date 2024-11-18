package com.nanuri.rams.business.assessment.pm22.pm22110;

import java.util.List;

import com.nanuri.rams.business.common.dto.RAA65BDTO;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.PM22110SVO;

@Service
public interface PM22110Service {
	// 사후관리 현황보고 조회
	public List<PM22110SVO> getAfterMngSttnList(PM22110SVO sttnList);

	// 사후관리 현황보고 모니터링 사항 저장
	public int mergeMntrCntnt(RAA65BDTO inputParam);
}
