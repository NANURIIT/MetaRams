package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS609BDTO;
import com.nanuri.rams.business.common.dto.RAA63BDTO;
import com.nanuri.rams.business.common.vo.IBIMS609BVO;
import com.nanuri.rams.business.common.vo.RAA63BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
/*
 * 부실자산시효관리정보
 * */
public interface IBIMS609BMapper {
	// 조회
	public List<IBIMS609BVO> getEfctDetail(IBIMS609BDTO efctInfo);
	
	// 등록
	public int registEfctInfo(IBIMS609BDTO efctInfo);
	
	// 수정
	public int updateEfctInfo(IBIMS609BDTO efctInfo);
	
	// 삭제
	public int deleteEfctInfo(IBIMS609BDTO efctInfo);
	
	// 일련번호 조회
	public IBIMS609BDTO getEfctSq(IBIMS609BDTO efctInfo);
}
