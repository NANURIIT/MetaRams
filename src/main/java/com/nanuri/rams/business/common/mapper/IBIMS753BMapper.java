package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS753BDTO;
import com.nanuri.rams.business.common.vo.IBIMS753BVO;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Mapper
public interface IBIMS753BMapper {

	List<IBIMS753BVO> getMrtgFcsList(IBIMS753BVO params);

	List<IBIMS753BVO> getMsgTransList(IBIMS753BVO params);

	List<IBIMS753BVO> getErrDpchTabList(IBIMS753BVO params);

	int deleteMrtgFcsList(IBIMS753BVO params);

	int insertMrtgFcsList(List<IBIMS753BDTO> paramList);

	int deleteMsgTransList(IBIMS753BVO params);

	int insertMsgTransList(List<IBIMS753BDTO> paramList);

	int deleteErrDpchList(IBIMS753BVO params);

	int insertErrDpchList(List<IBIMS753BDTO> paramList);

}
