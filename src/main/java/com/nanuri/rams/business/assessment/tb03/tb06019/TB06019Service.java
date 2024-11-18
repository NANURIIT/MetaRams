package com.nanuri.rams.business.assessment.tb03.tb06019;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepCdVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepListVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.ArdyBzepVO;
import com.nanuri.rams.business.common.vo.IBIMS010BVO.SchCondVO;

@Service
public interface TB06019Service {
	
	// 기업체 정보 조회
	public ArdyBzepVO getArdyBzepInfo(SchCondVO schVo);

	// 기업체 정보 목록 조회
	public List<ArdyBzepListVO> getArdyBzepInfoList(SchCondVO schVo);
	
	// 기업체 정보 등록/수정/사용여부 수정 처리
	public SchCondVO saveArdyBzepInfo(ArdyBzepVO saveVo);

	// 기업체 정보 사용여부 수정
	public int deleteArdyBzepInfo(ArdyBzepVO saveVo);

	// 기업체 사용여부 코드값
	public List<ArdyBzepCdVO> getArdyBzepCd(SchCondVO schVo);
}
	