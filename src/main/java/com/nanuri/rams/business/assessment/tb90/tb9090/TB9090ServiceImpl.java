package com.nanuri.rams.business.assessment.tb90.tb9090;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS998BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9090ServiceImpl implements TB9090Service {

	@Autowired
	private final IBIMS997BMapper ibims997bMapper;
	@Autowired
	private final IBIMS998BMapper ibims998bMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Override
	public String insert(IBIMS997BDTO param) {

		String result = "5";

		try {
			// 배치 시작정보 업데이트
			param.setHndEmpno("BATCH");
			ibims997bMapper.updateIBIMS997B(param);
			ibims997bMapper.updateJobStatus(param.getCurDate(), param.getJobId(), "3"); // 3:Running

			///////////////////////////////////////////////////////////

			// 업무내용
			dailyWorkEndBatch(param);

			///////////////////////////////////////////////////////////

			// 배치 완료정보 업데이트
			ibims997bMapper.batchUpdate(param);
			ibims997bMapper.subPreJobCount(param);

			result = "4";
		}

		catch (Exception e) {
			if (e instanceof InterruptedException) {
				log.info("스레드 중단 오류 발생!!");
				result = "7";
			} else {
				log.info("배치중 오류 발생!!");
				result = "5";
			}
		}

		return result;
	}

	private void dailyWorkEndBatch(IBIMS997BDTO param) {
		// param.setHndEmpno(facade.getDetails().getEno());

		ibims998bMapper.dailyWorkEnd(param);
	}

}