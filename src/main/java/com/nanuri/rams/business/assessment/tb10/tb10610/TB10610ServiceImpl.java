package com.nanuri.rams.business.assessment.tb10.tb10610;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.batch.ScheduleTask;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;
import com.nanuri.rams.business.common.vo.IBIMS997BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10610ServiceImpl implements TB10610Service {

	private final IBIMS997BMapper ibims997bmp;
	private final IBIMS999BMapper ibims999bMapper;

	/* 로그인 사용자 정보 */
	private final AuthenticationFacade facade;
	
	@Autowired
	private final ScheduleTask scheduleTask;

	// 배치 스케줄러 모니터링 조회
	@Override
	public IBIMS997BVO inqBatch(IBIMS997BVO input) {
		IBIMS997BVO out997bvo = new IBIMS997BVO();
		
		List<IBIMS997BVO> ibims997bvo = ibims997bmp.selectIBIMS997B(input);
		
		out997bvo.setBatSchM(ibims997bvo);

		return out997bvo;
	};



	// 배치 스케줄러 모니터링 실행
	@Override
    public int excBatch(IBIMS997BVO input) {

		int result = 0;
		
		// 현재 날짜와 시간 가져오기
        LocalDateTime currentDateTime = LocalDateTime.now();
        // 원하는 포맷 지정 (HH:mm:ss.SSS)
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        // 포맷에 맞춰서 날짜를 문자열로 변환
        String formattedTime = currentDateTime.format(timeFormat);

		if(!input.getArgument().isEmpty()){
			ibims999bMapper.delete();
			ibims999bMapper.insert(input.getArgument());
		}
		// input.setStartTime(formattedTime);
		input.setHndEmpno(facade.getDetails().getEno());
		input.setHndTmnlNo("");
		input.setHndTrId("");
		input.setGuid("");

		if ("5".equals(input.getJobStatus())) {
			ibims997bmp.subPreJobCount(input);
		}
		result = ibims997bmp.jobStatusUpdate(input);

		return result;
	};

	// 배치 스케줄러 모니터링 초기화
	@Override
    public int resetBatch(IBIMS997BVO input) {
		int result = 0;

		List<IBIMS997BVO> inList = input.getBatSchM();

		for (IBIMS997BVO in997bvo : inList) {
			in997bvo.setStartTime("");
			in997bvo.setEndTime("");
			in997bvo.setJobStatus("0");
			in997bvo.setHndEmpno(facade.getDetails().getEno());
			in997bvo.setHndTmnlNo("");
			in997bvo.setHndTrId("");
			in997bvo.setGuid("");
			
			result = ibims997bmp.resetBatch(in997bvo);
		}

		return result;
	};

	// 배치 스케줄러 모니터링 confirm 수정
    public int updateConfirm(IBIMS997BVO input) {
		int result = 0;

		input.setHndEmpno(facade.getDetails().getEno());
		input.setHndTmnlNo("");
		input.setHndTrId("");
		input.setGuid("");

		result = ibims997bmp.updateConfirm(input);

		return result;
	}

	@Override
	public boolean killtask() {
		return scheduleTask.stopBatch("20250213", "TB9000B");
	};
}
