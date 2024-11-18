package com.nanuri.rams.business.common.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.vo.MO44020SVO;

@Mapper
public interface RAA36BMapper {

	// 승인조건 SELECT
	List<MO44020SVO> getPacmList(HashMap<String, Object> params);

	// 이행계획 INSERT
	int insertRaa36b(HashMap<String, Object> params);

	// RAA36B 레코드 SELECT
	int selectOneRaa36b(HashMap<String, Object> params);

	// 이행계획 UPDATE
	int updateRaa36b(HashMap<String, Object> params);
	
	// 승인조건 사전관리 승인요청
	int updateRcgRqs(HashMap<String, String> paramDto);

	// 승인조건 사전관리 반송
	int updateRcgRtvl(HashMap<String, String> paramDto);

	// 승인조건 사전관리 승인
	int updateRcg(HashMap<String, String> paramDto);

	// 승인조건 사전관리 심사역 확인
	int updateExmntFnsh(HashMap<String, String> paramDto);

	// 승인조건 사전관리 심사부서장 확인
	int updateDprtMngrFnsh(HashMap<String, String> paramDto);

}
