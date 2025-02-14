package com.nanuri.rams.business.assessment.tb10.tb10610;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS997BVO;

@Service
public interface TB10610Service {

	// 배치 스케줄러 모니터링 조회
	public IBIMS997BVO inqBatch(IBIMS997BVO input);

    // 배치 스케줄러 모니터링 실행
    public int excBatch(IBIMS997BVO input);

	// 배치 스케줄러 모니터링 초기화
    public int resetBatch(IBIMS997BVO input);

	// 배치 스케줄러 모니터링 confirm 수정
    public int updateConfirm(IBIMS997BVO input);
}
