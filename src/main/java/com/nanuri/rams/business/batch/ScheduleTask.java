package com.nanuri.rams.business.batch;

import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ScheduleTask {

    @Autowired 
    JobLauncher jobLauncher;
    
    //TODO: 동적스케줄링
    /*
    @Autowired
    @Qualifier("REGIST_BATCH_SCHEDULE") 
	Job REGIST_BATCH_SCHEDULE;
    */
    
    //업무개시 배치
    @Autowired
    @Qualifier("DAILY_WORK_START_BATCH") 
	Job DAILY_WORK_START_BATCH;
    
    /*
    @Autowired
    @Qualifier("DAILY_WORK_END_BATCH") 
	Job DAILY_WORK_END_BATCH;
    */
    
    //TODO: 동적스케줄링
    /*
	@Scheduled(cron="0 0 0 * * *", zone="Asia/Seoul") //TEST
	public void registBatchSchedule() throws Exception{
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> START");
		log.info( "################################################################################" );
		
		RegistBatchSchedule sch = new RegistBatchSchedule();
		List<BatchMasterVo> batchList = sch.getList();
		
		for(BatchMasterVo data : batchList) {
			ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
			
			String execTm = data.getExecTm();
			String cron = "0 0/1 * * * *";
			
			scheduler.initialize();
			
            scheduler.schedule(() -> {
                  System.out.println("동적 스케쥴러 실행");
             }, new CronTrigger(cron)
            );
		}
		
		log.info( "################################################################################" );
		log.info( "REGIST_BATCH_SCHEDULE ==> END");
		log.info( "################################################################################" );
	}
	*/
    
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
	
	
}
