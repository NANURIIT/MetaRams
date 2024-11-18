package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.RAA31BDTO;
import com.nanuri.rams.business.common.vo.MO44040SVO.DealInfo;
import com.nanuri.rams.business.common.vo.MO44040SVO.SearchParam;
import com.nanuri.rams.business.common.vo.RAA31BVO;

@Mapper
public interface RAA31BMapper {
	
	// select
	public RAA31BDTO selectRaa31b(RAA31BVO.SearchParam searchParam);
	
	// insert
	public int insertRaa31b(RAA31BVO.SearchParam raa31b);
	
	// update
	public int updateRaa31b(RAA31BDTO raa31b);
	
	
	
	
	// 의무이행계획정보 Mapper
	/*
	 * 셀다운의무
	 * */
	// 조회
	public List<RAA31BVO> getOpList(RAA31BVO opList);
	
	// 등록
	public int registOpInfo(RAA31BVO opInfo);
	
	// 수정
	public int updateOpInfo(RAA31BVO opInfo);
	
	// 삭제
	public int deleteOpInfo(RAA31BVO opInfo);
	
	/*
	 * 기타의무
	 * */
	// 조회
	public List<RAA31BVO> getEtcList(RAA31BVO etcList);
	
	// 등록
	public int registEtcInfo(RAA31BVO etcInfo);
	
	// 수정
	public int updateEtcInfo(RAA31BVO etcInfo);
	
	// 삭제
	public int deleteEtcInfo(RAA31BVO etcInfo);

	public List<DealInfo> getSellDownList(SearchParam searchParam);

	public List<DealInfo> getEtcListMO44040S(SearchParam searchParam);

	

	
}
