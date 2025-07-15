package com.nanuri.rams.business.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS752BDTO;
import com.nanuri.rams.business.common.vo.IBIMS752BVO;

/**
 * 한국신용정보원 - 한도정보
 * 2025.07.08 ejchoi
 */
@Mapper
public interface IBIMS752BMapper {

	List<IBIMS752BVO> getLmtFcssList(IBIMS752BVO params);

	List<IBIMS752BVO> getMsgTransList(IBIMS752BVO params);

	List<IBIMS752BVO> getErrDpchTabList(IBIMS752BVO params);

	int deleteLmtFcssList(IBIMS752BVO params);

	int insertLmtFcssList(List<IBIMS752BDTO> paramList);

	int deleteMsgTransList(IBIMS752BVO params);

	int insertMsgTransList(List<IBIMS752BDTO> paramList);

	int deleteErrDpchList(IBIMS752BVO params);

	int insertErrDpchList(List<IBIMS752BDTO> paramList);

}
