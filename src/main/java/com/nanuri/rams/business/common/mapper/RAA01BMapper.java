package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.RAA01BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.vo.RAA01BVO;
import com.nanuri.rams.business.common.vo.RAA01BVO.DealInfo;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealDetails;
import com.nanuri.rams.business.common.vo.RAA01BVO.checkDealInfo;

@Mapper
public interface RAA01BMapper {

	public List<RAA01BVO> getDealInfo(DealInfo dealInfo);

	// 신규 deal 생성
	public void insertDealInfo(RAA01BDTO paramData);

	// deal 정보 갱신
	public void updateDealInfo(RAA01BDTO raa01bDTO);
	
	// 심사안건조회
	List<checkDealDetails> checkDealSearch(checkDealInfo dealInfo);
	
	// AS05110S - 안건관리 - 담당자 일괄변경
	public void updateChrgPEno(@Param(value = "arrDealNo") String[] arrDealNo
			                 , @Param(value = "hndlDprtCd") String hndlDprtCd
			                 , @Param(value = "hndlPEno") String hndlPEno
			                 , @Param(value = "dprtCd") String dprtCd
			                 , @Param(value = "hdqtCd") String hdqtCd
			                 , @Param(value = "chrgPEno") String chrgPEno
			                 );
	// IBDEAL일련번호 조회
	public String getIbDealSq(RAA02BDTO raa02bDTO);
}
