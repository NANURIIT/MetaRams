package com.nanuri.rams.business.batch;

import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
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
    
    private final BatchScheduleService batchScheduleService; 
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
    @Scheduled(cron="0 0/1 * * * *", zone="Asia/Seoul") //TEST
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
            
            //insert notrunning 
            batch.setJobStatus("1");	//1:Not Running
            ibims997bMapper.mergeBatchNotRunning(batch);
        }
    }

	private String tmToCron(String execTm) {
		String[] parts = execTm.split(":");
	    int hour = Integer.parseInt(parts[0]); 
	    int minute = Integer.parseInt(parts[1]); 

	    return String.format("30 %d %d * * *", minute, hour); //test
	    //return String.format("0 %d %d * * *", minute, hour);
	}
	
	public boolean stopBatch(String jobId) {
	    if (scheduledTasks.containsKey(jobId)) {
	        scheduledTasks.get(jobId).cancel(false); // 배치 중지
	        scheduledTasks.remove(jobId);
	        log.info("Batch {} has been stopped.", jobId);
	        return true;
	    }
	    return false; // 실행 중인 배치가 없음
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
