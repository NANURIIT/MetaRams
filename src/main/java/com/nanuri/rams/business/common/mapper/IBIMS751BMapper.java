package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS751BDTO;
import com.nanuri.rams.business.common.vo.IBIMS751BVO;

/**
 * 한국신용정보원 - 신공공여정보
 * 2025.07.08 ejchoi
 */
@Mapper
public interface IBIMS751BMapper {

	List<IBIMS751BVO> getCrdtGrntFcsList(IBIMS751BVO params);

	List<IBIMS751BVO> getMsgTransList(IBIMS751BVO params);

	List<IBIMS751BVO> getErrDpchTabList(IBIMS751BVO params);

	int deleteCrdtGrntFcsList(IBIMS751BVO params);

	int insertCrdtGrntFcsList(List<IBIMS751BDTO> paramList);

	int deleteMsgTransList(IBIMS751BVO params);

	int insertMsgTransList(List<IBIMS751BDTO> paramList);

	int deleteErrDpchList(IBIMS751BVO params);

	int insertErrDpchList(List<IBIMS751BDTO> paramList);

}
