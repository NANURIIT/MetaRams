package com.nanuri.rams.business.batch;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;

import com.nanuri.rams.business.batch.job.RegistBatchSchedule;
import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Component
public class ScheduleTask {

    @Autowired 
    JobLauncher jobLauncher;
    /*
    private final RegistBatchSchedule registBatchSchedule; 
    private final Map<String, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();
    private final ScheduledThreadPoolExecutor scheduler = (ScheduledThreadPoolExecutor) Executors.newScheduledThreadPool(10);
    */
    /*
    //TODO: 동적스케줄링
    @Autowired
    @Qualifier("REGIST_BATCH_SCHEDULE") 
	Job REGIST_BATCH_SCHEDULE;
    */
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
    /*
    //TODO: 동적스케줄링
    @Scheduled(cron="0 0/1 * * * *", zone="Asia/Seoul") //TEST
	public void registBatchSchedule() throws Exception{
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> START");
		log.info( "################################################################################" );
		
		List<BatchMasterVo> batchList = registBatchSchedule.getList();
		
		// 기존 스케줄 중지
        scheduledTasks.values().forEach(future -> future.cancel(false));
        scheduledTasks.clear();
		
		for(BatchMasterVo data : batchList) {
			ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
			
			log.info(data.toString());
			
			scheduleBatch(data);
			
			
			
//			String execTm = data.getExecTm();
//			String cron = "0 0/1 * * * *";
//			
//			scheduler.initialize();
//			
//            scheduler.schedule(() -> {
//                  System.out.println("동적 스케쥴러 실행");
//             }, new CronTrigger(cron)
//            );
            
            
		}
		
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> END");
		log.info( "################################################################################" );
	}
    */
    /*
    private void scheduleBatch(BatchMasterVo batch) {
        String jobId = batch.getJobId();
        String execTm = batch.getExecTm();
        String cronExpression = tmToCron(execTm);

        log.info("Scheduling batch job: {} with cron: {}", jobId, cronExpression);

        Runnable task = () -> registBatchSchedule.executeBatch(jobId);
        
        log.info( String.valueOf(parseCronToSeconds(cronExpression)));

        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(
            task, parseCronToSeconds(cronExpression), parseCronToSeconds(cronExpression), TimeUnit.SECONDS
        );

        scheduledTasks.put(jobId, future);
    }

	private String tmToCron(String execTm) {
		// 시간과 분을 ":" 기준으로 분리
		String[] parts = execTm.split(":");
		int hour = Integer.parseInt(parts[0]); // 시간 (HH)
		int minute = Integer.parseInt(parts[1]); // 분 (mm)

		// 크론 표현식 반환 (mm HH * * *)
		return String.format("%d %d * * *", minute, hour);
	}

	private long parseCronToSeconds(String cronExpression) {
		// 크론 표현식에서 분(minute)과 시간(hour) 추출
		String[] parts = cronExpression.split(" ");
		int minute = Integer.parseInt(parts[0]); // 분
		int hour = Integer.parseInt(parts[1]); // 시간

		// 초 단위 변환: (시간 * 3600) + (분 * 60)
		long seconds = (hour * 3600L) + (minute * 60L);

		return Math.max(seconds, 1);
	}
	
	
	*/
    
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
