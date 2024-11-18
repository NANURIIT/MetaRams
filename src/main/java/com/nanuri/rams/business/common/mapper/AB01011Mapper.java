package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAB01BDTO;
import com.nanuri.rams.business.common.dto.RAB04BDTO;
import com.nanuri.rams.business.common.vo.AB01011SVO;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnDeptNoInfo;
import com.nanuri.rams.business.common.vo.AB01011SVO.repDsgnUsrNoInfo;

//CALL Report 등록
// 20230926 DB-Table 변경된 MAPPER 로 미사용
@Mapper
public interface AB01011Mapper {
	
	public List<AB01011SVO> getRepNo(String repNo);
	
	//신규등록
	//
	public int registCallReportInfo(RAB01BDTO callReportInfo);

	public List<AB01011SVO> getEntpList(String entpNm);
	
	//업채정보 등록
    public int registEntpInfo(RAB01BDTO entpInfo);
    
    //지정조회자 등록
    public int insertRepDsgnUsrNoInfo(List<repDsgnUsrNoInfo> paramData);
    
    //지정조회 부서 등록
    public int insertRepDsgnDeptNoInfo(List<repDsgnDeptNoInfo> paramData);
    
    //첨부파일 등록
    public int insertFileInfo(RAB04BDTO dto);	
    
    // 첨부파일 삭제
	public int updateFileInfo(RAB04BDTO info);	
	
    // 첨부파일 목록
	public List<RAB04BDTO> selectFileInfo(RAB04BDTO dto);

		


}
