package com.nanuri.rams.business.batch.job;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.batch.CallBatchMethod;
import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS995BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BatchScheduleService {

	private final IBIMS995BMapper ibims995bMapper;
	private final IBIMS997BMapper ibims997bMapper;
	
	private final Map<String, Future<?>> batchExecutionTasks = new ConcurrentHashMap<>();

	private final CallBatchMethod callBatchMethod;

	@Autowired
	private ThreadPoolTaskExecutor taskExecutor;

	public List<BatchMasterVo> getList() {
		return ibims995bMapper.selectBatchMaster();
	}

	public List<BatchMasterVo> getBatchScheduleStatus(String date) {
		return ibims995bMapper.getBatchScheduleStatus(date);
	}

	public Map<String, Future<?>> getBatchExecutionTasks() {
		return batchExecutionTasks;
	}

	public void executeBatch(BatchMasterVo batch) {
		String jobId = batch.getJobId();
		log.info("Executing batch job: {}", jobId);

		// 이미 실행 중이면 중복 실행 방지
		if (batchExecutionTasks.containsKey(jobId)) {
			log.warn("⚠️ Batch '{}' 이미 실행 중!", jobId);
			return;
		}

		// 해당스케줄러 정보 가져옴
		IBIMS997BDTO ibims997bdto = ibims997bMapper.selectJobScheduler(batch.getCurDate(), jobId);

		// stop 상태 확인 8:Stop
		if ("8".equals(ibims997bdto.getJobStatus())) {
			log.info("BATCH JOB_STATUS STOP. JOB_ID : " + jobId);
			return;
		}

		List<BatchMasterVo> list = getList();

		for (BatchMasterVo temp : list) {
			if (temp.getJobId().equals(jobId)) {
				// update Waiting
				ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "2"); // 2:Waiting

				// 실행할 때 비동기 방식으로 실행하고 Future 저장
				Future<?> future = taskExecutor.submit(() -> {
					try {
						executeJob(batch);
					} catch (InterruptedException e) {
						log.info("🔴 Batch {} 인터럽트 예외 발생: 중단됨", jobId);
						Thread.currentThread().interrupt();
					}
				});
				batchExecutionTasks.put(jobId, future);
			}
		}

		log.info("✅ Batch Job 실행 완료: {}", jobId);
	}

	private void executeJob(BatchMasterVo batch) throws InterruptedException {
		String jobId = batch.getJobId();

		// 해당스케줄러 정보 가져옴
		IBIMS997BDTO ibims997bdto = ibims997bMapper.selectJobScheduler(batch.getCurDate(), jobId);

		// 선행배치 리스트 가져옴
		List<IBIMS997BDTO> preList = ibims997bMapper.selectListPreBatch(batch.getCurDate(), jobId);

		// 선행배치중에 STOP 상태 있는지 확인
		for (IBIMS997BDTO preBatch : preList) {
			if ("8".equals(preBatch.getJobStatus())) {
				log.info("선행배치 STOP 상태. Job 실행대기");
				log.info("PRE BATCH JOB_STATUS STOP. JOB_ID : " + jobId + " PRE_BATCH_ID : " + preBatch.getJobId());
				return;
			}
		}

		// 선행배치 남은 갯수 확인
		if (ibims997bdto.getPreJobCount() != 0) {
			log.info(jobId + " - 선행배치" + ibims997bdto.getPreJobCount() + "개 남아있음 배치 대기상태.");
			return;
		}

		// update Running
		ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "3"); // 3:Running
		log.info("BATCH RUNNING. JOB_ID : " + jobId);

		// 아래 Job 로직
		///////////////////////////////////////////////////////////////////////

		ibims997bdto.setBatchCmdDcd("1");

		String status = callBatchMethod.callMethod(jobId, ibims997bdto);

		ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, status); // 결과
		
		///////////////////////////////////////////////////////////////////////

		// 

		// 테스트로직
		// for (int i = 0; i < 10000; i++) {
		// if (Thread.currentThread().isInterrupted()) { // 실행 중지 감지
		// log.info("🔴 Batch {} 강제 종료됨!", jobId);
		// break;
		// }
		// log.info("batch cancel test " + i);
		// //Thread.sleep(1000);
		// }

		// 중간에 오류나면 Error
		// ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "5"); // 5:Error
		// 끝나고 update Complete
		// update Complete
		// ibims997bMapper.updateJobStatus(batch.getCurDate(), jobId, "4"); // 4:Complete
		// ibims997bMapper.updateBatchCmdDcd(batch.getCurDate(), jobId, "1"); // 정상종료인경우만
	}

}