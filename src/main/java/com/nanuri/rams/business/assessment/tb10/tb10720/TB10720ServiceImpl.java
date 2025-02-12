package com.nanuri.rams.business.assessment.tb10.tb10720;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ScheduledFuture;

import org.slf4j.Logger;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameter;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS998BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS998BMapper;
import com.nanuri.rams.business.common.vo.IBIMS998BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TB10720ServiceImpl implements TB10720Service {
	
	@Autowired
	private TaskScheduler taskScheduler;
	private Map<String, ScheduledFuture<?>> scheduledtasks = new ConcurrentHashMap<>();
	
	@Autowired 
	JobLauncher jobLauncher;
	
	@Autowired   
	@Qualifier("DAILY_WORK_START_BATCH") 
	Job DAILY_WORK_START_BATCH;
	
	private Logger logger = org.slf4j.LoggerFactory.getLogger(this.getClass());
	private final IBIMS998BMapper ibims998bmp;
	private final AuthenticationFacade facade;
	
    // 마감기본 영업일 기준 조회
	@Override
	public IBIMS998BVO selectTB10720S(IBIMS998BVO input) {
		logger.debug("++++++++ RUN MAPPER : selectTB10720S ++++++++");
//		System.out.println("++++++++ RUN MAPPER : selectTB10720S ++++++++");
		IBIMS998BVO vo = new IBIMS998BVO();
		vo.setGrd_TB10720S(ibims998bmp.selectTB10720S(input));
		return vo;
	}

	// 마감관리 개시/마감 실행
	@Override
	@Transactional
	public int updateTB10720S(IBIMS998BVO input) {
		logger.debug("++++++++ RUN MAPPER : updateTB10720S ++++++++");
		logger.debug("input.jobOpngYn : " + input.getJobOpngYn());
		
		int excCnt = 0;
		IBIMS998BDTO dto = new IBIMS998BDTO();
		dto.setStdrDt(input.getStdrDt());
		
		if("Y".equalsIgnoreCase(input.getJobOpngYn())) {
			dto.setJobOpngDtime(new Date());
			dto.setOpngStfno(facade.getDetails().getEno());
			dto.setOpngOrgno(facade.getDetails().getDprtCd());
			dto.setHdwrOpngYn("Y");
			dto.setHndEmpno(facade.getDetails().getEno());
			excCnt = ibims998bmp.openTB10720S(dto);
		} else {
			// 마갈일 경우 개시 데이터가 필요해서 mapper 나눔
			dto.setJobClsgDtime(new Date());
			dto.setClsgStfno(facade.getDetails().getEno());
			dto.setClsgOrgno(facade.getDetails().getDprtCd());
			dto.setHdwrClsgYn("Y");
			dto.setHndEmpno(facade.getDetails().getEno());
			excCnt = ibims998bmp.closeTB10720S(dto);
		}
		return excCnt;
	}

	@Override
	public void runBatchJob() throws Exception {
		JobParameter param = new JobParameter(System.currentTimeMillis());
		Map<String,JobParameter> parameters = new HashMap<String,JobParameter>();
		parameters.put("requestDate", param);
		jobLauncher.run(DAILY_WORK_START_BATCH, new JobParameters(parameters));
	}
	
}
