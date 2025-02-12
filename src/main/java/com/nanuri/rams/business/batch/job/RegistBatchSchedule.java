package com.nanuri.rams.business.batch.job;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.mapper.IBIMS995BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistBatchSchedule {

	private final IBIMS995BMapper ibims995BMapper;
	private final IBIMS997BMapper ibims997bMapper;

	@Autowired
	private TaskExecutor taskExecutor;

	public List<BatchMasterVo> getList() {
		return ibims995BMapper.selectBatchMaster();
	}

	public void executeBatch(BatchMasterVo batch) {
		String jobId = batch.getJobId();
		log.info("Executing batch job: {}", jobId);

		List<BatchMasterVo> list = ibims995BMapper.selectBatchMaster();

		for (BatchMasterVo temp : list) {
			if (temp.getJobId().equals(jobId)) {
				// update waiting
				ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "2");	//2:Waiting
				// taskExecutor.execute(() -> testBatch("test")); // 테스트
				taskExecutor.execute(() -> executeJob(batch));
			}
		}

		log.info("✅ Batch Job 실행 완료: {}", jobId);
	}

	private void executeJob(BatchMasterVo batch) {
		String jobId = batch.getJobId();
		// 여기
		// update running
		ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "3");	//3:Running
		log.info("TEST BATCH TB9000B. PARAM : " + jobId);
	}

}