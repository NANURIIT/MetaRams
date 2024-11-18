package com.nanuri.rams.business.assessment.tb07.tb07110;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;

@Service
public interface TB07110Service {
	
	// 지급품의 기본 조회
	public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param);

	// 지급품의 상세 조회
	public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param);
	
	// 결재요청
	public int apvlRqst(IBIMS431BVO param);

	// 지급품의 기본 등록/변경
	public int mergeIBIMS431B(IBIMS431BVO param);

	// 기본 삭제
	public int deleteIBIMS431B(IBIMS431BVO param);

	// 상세 삭제
	public int deleteIBIMS432B(IBIMS432BVO param);

	
}
