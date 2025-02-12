package com.nanuri.rams.business.batch.job;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.mapper.IBIMS995BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistBatchSchedule {
	
	private final IBIMS995BMapper ibims995BMapper;
	
	@Autowired
    private TaskExecutor taskExecutor;

	public List<BatchMasterVo> getList(){
		return ibims995BMapper.selectBatchMaster();
	}

	public void executeBatch(String jobId) {
		 log.info("Executing batch job: {}", jobId);
		 
		 List<BatchMasterVo> list = ibims995BMapper.selectBatchMaster();
		 
		 for(BatchMasterVo batch : list) {
			 if(batch.getJobId().equals(jobId)) {
				 //taskExecutor.execute(() -> testBatch("test")); // 테스트
				 taskExecutor.execute(() -> executeJob(jobId));
			 }
		 }
		 
		 log.info("✅ Batch Job 실행 완료: {}", jobId);
	}

	private void executeJob(String param) {
		//여기
		
		log.info( "TEST BATCH TB9000B. PARAM : " + param );
	}
	
}