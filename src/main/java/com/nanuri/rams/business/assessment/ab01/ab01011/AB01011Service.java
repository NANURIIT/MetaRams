package com.nanuri.rams.business.assessment.ab01.ab01011;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.nanuri.rams.business.common.dto.RAB04BDTO;
import com.nanuri.rams.business.common.vo.AB01011SVO;
import com.nanuri.rams.business.common.vo.AB01011SVO.CallReportInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnDeptNoInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnUsrNoInfo;

@Service
public interface AB01011Service {
	
	public List<AB01011SVO> findRepNo(String repNo);
	//불러오기
	
	//임시저장
	
	//
	
	
	//업체정보 조회
	public List<AB01011SVO> findEntpList(String entpNm);
	
	//CallReport 정보 저장
	public int registCallReportInfo(CallReportInfo callReportInfo);

	//지정조회자 정보 저장
	public int registRepDsgnUsrNoInfo(@RequestBody List<repDsgnUsrNoInfo> paramData);
	
	//지정조회부서 정보 저장
	public int registRepDsgnDeptNoInfo(@RequestBody List<repDsgnDeptNoInfo> paramData);
	
	// Call Report 파일 저장
	public void registRepFileInfo(RAB04BDTO dto);
    
	// 파일 조회
	public List<RAB04BDTO> getListFileInfo(RAB04BDTO dto);
	// 파일 삭제
	public void deleteFileInfo(RAB04BDTO dto);

	

	
	
}
