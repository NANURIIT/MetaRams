package com.nanuri.rams.business.assessment.tb10.tb10510;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS995BDTO;
import com.nanuri.rams.business.common.dto.IBIMS996BDTO;
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

	public boolean isBatchScheduler();

	/**
	 * 선행 job 조회
	 * @param param
	 * @return
	 */
	public List<IBIMS996BDTO> inqPreJob ( String param );
}
