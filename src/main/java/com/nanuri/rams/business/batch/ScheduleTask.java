package com.nanuri.rams.business.batch;

import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Future;
import java.util.concurrent.ScheduledFuture;

import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import com.nanuri.rams.business.batch.job.BatchScheduleService;
import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class ScheduleTask {

    @Autowired 
    JobLauncher jobLauncher;
    
    private final IBIMS997BMapper ibims997bMapper;
    
    private volatile boolean batchRunning = false; // 개발용 임시중지
    //private volatile boolean batchRunning = true;
    
    @Autowired
    private BatchScheduleService batchScheduleService; 
    private final Map<String, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();
    
    public boolean isBatchScheduler() {
		return batchRunning;
	}
    
    public boolean stopBatchScheduling() {
        batchRunning = false;
        return batchRunning;
    }
    
    public boolean startBatchScheduling() {
        batchRunning = true;
        return batchRunning;
    }
    
    /*
    //업무개시 배치
    @Autowired
    @Qualifier("DAILY_WORK_START_BATCH") 
	Job DAILY_WORK_START_BATCH;
    */
    
    /*
    @Autowired
    @Qualifier("DAILY_WORK_END_BATCH") 
	Job DAILY_WORK_END_BATCH;
    */
    
    //TODO: 동적스케줄링
    @Scheduled(cron="0 0/28 * * * *", zone="Asia/Seoul") //TEST
	public void batchScheduleService() throws Exception{
    	
    	if (!batchRunning) {
            log.info("Batch execution is stopped.");
            return;
        }else {
        	log.info("Batch execution is running.");
        }
    	
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> START");
		log.info( "################################################################################" );
		
		List<BatchMasterVo> batchList = batchScheduleService.getList();
		
		// 기존 스케줄 중지 및 초기화
        scheduledTasks.values().forEach(future -> future.cancel(false));
        scheduledTasks.clear();
		
        for (BatchMasterVo data : batchList) {
            if (!scheduledTasks.containsKey(data.getJobId())) {
                scheduleBatch(data); // 새로운 배치만 추가
            }
        }
		
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> END");
		log.info( "################################################################################" );
	}
    
    private void scheduleBatch(BatchMasterVo batch) {
    	String jobId = batch.getJobId();
        String cronExpression = tmToCron(batch.getExecTm());

        log.info("Scheduling batch job: {} with cron: {}", jobId, cronExpression);

        //Job등록할 task를 만든다
        Runnable task = () -> batchScheduleService.executeBatch(batch);

        if (!scheduledTasks.containsKey(jobId)) {
            ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
            scheduler.initialize();

            ScheduledFuture<?> future = scheduler.schedule(task, new CronTrigger(cronExpression, TimeZone.getTimeZone("Asia/Seoul")));

            // 스케줄러에 Job을 등록
            scheduledTasks.put(jobId, future);
            
            //merge notrunning 
            batch.setJobStatus("1");	//1:Not Running
            ibims997bMapper.mergeBatchNotRunning(batch);
        }
    }

	private String tmToCron(String execTm) {
		String[] parts = execTm.split(":");
	    int hour = Integer.parseInt(parts[0]); 
	    int minute = Integer.parseInt(parts[1]); 

	    return String.format("20 %d %d * * *", minute, hour); //test
	    //return String.format("0 %d %d * * *", minute, hour);
	}
	
	public boolean startBatch(String curDate,String jobId) {
	    log.info("▶️ Batch {} 시작 요청됨!", jobId);

	    // 배치 목록 조회 후 jobId에 해당하는 배치 실행
	    List<BatchMasterVo> batchList = batchScheduleService.getList();
	    for (BatchMasterVo batch : batchList) {
	        if (batch.getJobId().equals(jobId)) {
	        	
	        	batch.setCurDate(curDate);
	        	
	        	//merge notrunning 
	            batch.setJobStatus("1");	//1:Not Running
	            ibims997bMapper.mergeBatchNotRunning(batch);
	        	
	        	//쓰레드 없이 즉시실행
	        	batchScheduleService.executeBatch(batch);
	            
	            log.info("✅ Batch {} 실행 완료!", jobId);
	            return true;
	        }
	    }

	    log.warn("⚠️ '{}'에 해당하는 배치를 찾을 수 없음", jobId);
	    return false;
	}
	
	public boolean stopBatch(String curDate, String jobId) {
		// update Terminate
		ibims997bMapper.updateJobStatus(curDate, jobId, "6"); // 6:Terminate
		log.info("🔴 Batch 중지 요청: {}", jobId);

	    // 1. 예약된 배치 스케줄 취소
	    if (scheduledTasks.containsKey(jobId)) {
	        scheduledTasks.get(jobId).cancel(false);
	        scheduledTasks.remove(jobId);
	        log.info("✅ 스케줄링된 배치 '{}' 중지 완료", jobId);
	    } else {
	        log.warn("⚠️ '{}'에 대한 예약된 배치 작업을 찾을 수 없음", jobId);
	    }

	    // 2. 실행 중인 배치 확인 및 강제 종료
	    Future<?> future = batchScheduleService.getBatchExecutionTasks().get(jobId);
	    if (future != null) {
	        boolean canceled = future.cancel(true);
	        batchScheduleService.getBatchExecutionTasks().remove(jobId);
	        if (canceled) {
	        	// update Terminated
	    		ibims997bMapper.updateJobStatus(curDate, jobId, "7"); // 7:Terminated
	            log.info("✅ 실행 중인 배치 '{}' 중지 완료", jobId);
	            return true;
	        } else {
	            log.warn("⚠️ '{}' 실행 중이지만 중단할 수 없음", jobId);
	        }
	    } else {
	        log.warn("⚠️ '{}' 실행 중이지 않아 중단할 수 없음", jobId);
	    }

	    return false;
	}
	
	public boolean restartBatch(String curDate, String jobId) {
	    log.info("🔄 Batch {} 재시작 요청됨!", jobId);

	    // 실행 중인 배치 중지
	    stopBatch(curDate, jobId);

	    // 새로운 배치 실행
	    return startBatch(curDate, jobId);
	}

	public void forcedOk(String curDate, String jobId) {
		// Not Running, Error 인거 태스크 삭제해야하나 고민중
		// 1. 예약된 배치 스케줄 취소
	    if (scheduledTasks.containsKey(jobId)) {
	        scheduledTasks.get(jobId).cancel(false);
	        scheduledTasks.remove(jobId);
	        log.info("✅ 스케줄링된 배치 '{}' Forced-OK 완료", jobId);
	    } else {
	        log.warn("⚠️ '{}'에 대한 예약된 배치 작업을 찾을 수 없음", jobId);
	    }
		
		// update Complete
		ibims997bMapper.updateJobStatus(curDate, jobId, "4"); // 4:Complete
	}
	
	public void brakeBatch(String curDate, String jobId) {
		// Not Running 에서 왔을때는 정지시켜야함
		stopBatch(curDate, jobId);
		
		// update Stop
		ibims997bMapper.updateJobStatus(curDate, jobId, "8"); // 8:Stop
	}
    
    /*
	//DAILY_WORK_START_BATCH 일일업무개시배치 1일 1회	08:00
    @Scheduled(cron="0 0/2 * * * *", zone="Asia/Seoul")
    //@Scheduled(cron="0 0 8 * * *", zone="Asia/Seoul")
	public void DAILY_WORK_START_BATCH() throws Exception{
		log.info( "################################################################################" );
		log.info( "DAILY_WORK_START_BATCH ==> START");
		log.info( "################################################################################" );
		
		JobParameter param = new JobParameter(System.currentTimeMillis());
		Map<String,JobParameter> parameters = new HashMap<String,JobParameter>();
		parameters.put("requestDate", param);
		
		jobLauncher.run(DAILY_WORK_START_BATCH, new JobParameters(parameters));
		
		log.info( "################################################################################" );
		log.info( "DAILY_WORK_START_BATCH ==> END");
		log.info( "################################################################################" );
	}
	*/
	
	
}
