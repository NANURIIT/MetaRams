package com.nanuri.rams.business.assessment.tb10.tb10510;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS995BDTO;
import com.nanuri.rams.business.common.vo.IBIMS995BVO;

@Service
public interface TB10510Service {

	// 배치 스케줄러 관리 조회
	public IBIMS995BVO inqBatch(IBIMS995BDTO input);

	// 배치 스케줄러 관리 등록
    public int rgstBatch(IBIMS995BVO input);

	// 배치 스케줄러 관리 실행    
	public int excBatch(IBIMS995BVO input);

	// 배치 스케줄러 관리 삭제
	public int delBatch(IBIMS995BVO input);
	
	// 배치 스케줄러 실행
	public boolean startBatchScheduler();

	//배치 스케줄러 중지
	public boolean stopBatchScheduler();

	// 배치 스케줄러 상태확인
	public boolean isBatchScheduler();

	public void batchExecuteService(IBIMS995BVO input);
}
