package com.nanuri.rams.business.assessment.tb10.tb10720;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.assessment.tb90.tb9080.TB9080Service;
import com.nanuri.rams.business.assessment.tb90.tb9090.TB9090Service;
import com.nanuri.rams.business.batch.job.entity.BatchMasterVo;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.dto.IBIMS998BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS995BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS998BMapper;
import com.nanuri.rams.business.common.vo.IBIMS998BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TB10720ServiceImpl implements TB10720Service {
	
	public final String JOB_ID_WORK_START = "TB9080B";
	public final String JOB_ID_WORK_END = "TB9090B";
	
	@Autowired
	private final TB9080Service tb9080Service;
	
	@Autowired
	private final TB9090Service tb9090Service;
	
	private final IBIMS995BMapper ibims995bMapper;
	private final IBIMS997BMapper ibims997bMapper;
		
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
	public void daliyWorkStart() {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd"); 
		Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime()); 
		
		List<BatchMasterVo> lstBatch = ibims995bMapper.selectBatchMaster(strToday);
		
		for(BatchMasterVo batch : lstBatch) {
			if(JOB_ID_WORK_START.equals(batch.getJobId())) {
				
				ibims997bMapper.updateBatchCmdDcd(batch.getCurDate(), JOB_ID_WORK_START, "3"); // 3:(Re)Run
				
				IBIMS997BDTO ibims997bDTO = new IBIMS997BDTO();
				
				ibims997bDTO.setJobId(batch.getJobId());
				ibims997bDTO.setCurDate(batch.getCurDate());
				ibims997bDTO.setHndEmpno(batch.getHndEmpNo());
				ibims997bDTO.setHndTmnlNo(batch.getHndTmnlNo());
				ibims997bDTO.setHndTrId(batch.getHndTrId());
				ibims997bDTO.setGuid(batch.getGuid());
				
				String result = tb9080Service.insert(ibims997bDTO);
				
				ibims997bMapper.updateJobStatus(batch.getCurDate(), JOB_ID_WORK_START, result); // 결과
			}
		}
		
	}
	
	@Override
	public void daliyWorkEnd() {
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd"); 
		Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime()); 
		
		List<BatchMasterVo> lstBatch = ibims995bMapper.selectBatchMaster(strToday);
		
		for(BatchMasterVo batch : lstBatch) {
			if(JOB_ID_WORK_END.equals(batch.getJobId())) {
				
				ibims997bMapper.updateBatchCmdDcd(batch.getCurDate(), JOB_ID_WORK_END, "3"); // 3:(Re)Run
				
				IBIMS997BDTO ibims997bDTO = new IBIMS997BDTO();
				
				ibims997bDTO.setJobId(batch.getJobId());
				ibims997bDTO.setCurDate(batch.getCurDate());
				ibims997bDTO.setHndEmpno(batch.getHndEmpNo());
				ibims997bDTO.setHndTmnlNo(batch.getHndTmnlNo());
				ibims997bDTO.setHndTrId(batch.getHndTrId());
				ibims997bDTO.setGuid(batch.getGuid());
				
				String result = tb9090Service.insert(ibims997bDTO);
				
				ibims997bMapper.updateJobStatus(batch.getCurDate(), JOB_ID_WORK_END, result); // 결과
			}
		}
		
	}
	
}
