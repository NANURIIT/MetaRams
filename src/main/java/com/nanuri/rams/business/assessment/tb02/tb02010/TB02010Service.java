package com.nanuri.rams.business.assessment.tb02.tb02010;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO;
import com.nanuri.rams.business.common.vo.IBIMS100BVO.selectVO;
import com.nanuri.rams.business.common.vo.TB02010SVO;
import com.nanuri.rams.com.dto.WorkFlowDTO;


@Service
public interface TB02010Service {

	// 오늘의할일추가를 위한 (SQ)조회
	public int getSeqNo(IBIMS100BDTO getSeq);
	
	// 오늘의할일 summery조회
	public List<IBIMS100BVO> getSummaryInfo(IBIMS100BVO getSummary);			
	
	// 오늘의할일조회
	public List<IBIMS100BVO.selectVO> selectIBIMS100BInfo(selectVO selInfo);	
	
	// 오늘의할일등록
	public int insertIBIMS100BInfo(IBIMS100BDTO insertInfo);				
	
	// 오늘의할일변경(결재)
	public int updateIBIMS100BInfO(IBIMS100BDTO updateInfO);	
	
	// 오늘의할일변경(결재요청취소)
	public int deleteIBIMS100BInfo(IBIMS100BDTO deleteInfo);	

	// WF 작업내용 조회
	public TB02010SVO workFlowInq(WorkFlowDTO param);

}
