package com.nanuri.rams.business.assessment.tb07.tb07100;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.vo.IBIMS431BVO;
import com.nanuri.rams.business.common.vo.IBIMS432BVO;

@Service
public interface TB07100Service {
	
	// 지급품의 기본 조회
	public List<IBIMS431BVO> selectIBIMS431B(IBIMS431BVO param);

	// 지급품의 상세 조회
	public List<IBIMS432BVO> selectIBIMS432B(IBIMS432BVO param);
	
	// 결재요청
	public int apvlRqst(IBIMS431BVO param);

	// 지급품의 기본 등록/변경
	public int mergeIBIMS431B(IBIMS431BVO param);

	
	// 지급품의 기본 등록
	public int insertIBIMS431B(IBIMS431BVO param);
	
	// 지급품의 기본 변경
	public int updateIBIMS431B(IBIMS431BVO param);

	// 기본 삭제
	public int deleteIBIMS431B(IBIMS431BVO param);

	public int insertIBIMS432B(IBIMS432BVO param);
	
	// 상세 삭제
	public int deleteIBIMS432B(IBIMS432BVO param);

	// 품의번호 채번
    public String getCnstNo (IBIMS431BVO param);
}
