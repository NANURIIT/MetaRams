package com.nanuri.rams.business.assessment.tb07.tb07100;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;

@Service
public interface TB07100Service {
	
	// // 지급품의 기본 조회
	public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param);

	// // 지급품의 상세 조회
	public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param);

	// 지급품의기본 등록
	public int insertIBIMS431B(IBIMS431BVO param);
	
	// 지급품의기본 변경
	public int updateIBIMS431B(IBIMS431BVO param);

	// 지급품의기본 삭제
	public int deleteIBIMS431B(IBIMS431BVO param);

	// 지급품의상세 저장
	public int saveIBIMS432B(List<IBIMS432BVO> param);

	// 결재요청
	public int apvlRqst(IBIMS431BVO param);
	
}
