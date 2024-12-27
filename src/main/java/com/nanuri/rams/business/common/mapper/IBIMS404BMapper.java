package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS404BDTO;
import com.nanuri.rams.business.common.vo.IBIMS404BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;

@Mapper
public interface IBIMS404BMapper {
	
	// 여신실행금리생성
	public int insertCopyIBIMS344B(IBIMS404BDTO paramData);
	
	public int insertIBIMS404B(IBIMS404BDTO paramData);
	
	
	public int updateIBIMS404B(IBIMS404BDTO paramData);

	// 여신실행금리내역 조회
	public List<IBIMS404BVO> getBaseRateList(IBIMS404BVO paramData);

	// 여신실행금리 조회
	public IBIMS404BVO getBaseRate(IBIMS404BVO paramData);

	// 여신실행금리건수조회
	public int getBaseRateCnt(IBIMS404BVO paramData);
	
	// 월차이건수조회
	public int getMonthDiff(IBIMS404BVO paramData);

	//TB06015P 금리정보 조회
	public List<IBIMS404BVO> getIntrRateInfoList(TB06015SVO param);
	
	public List<IBIMS404BVO> selectIBIMS404B(String param);

	//TB07150S(조건변경) 금리정보 조회
	public List<IBIMS404BDTO> getIBIMS404ListInfo(TB07150SVO param);


	public List<IBIMS404BVO> getIntrRateInfos(TB06015SVO param);
	public int insertListIBIMS404B(TB06015SVO paramData);
	public int updateListIBIMS404B(IBIMS404BDTO paramData);	
	public int deleteIBIMS404B(TB06015SVO paramData);
	
}
