package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.vo.TB05040SVO;
import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS103BDTO;
import com.nanuri.rams.business.common.vo.IBIMS103BVO;
import com.nanuri.rams.business.common.vo.TB04020SVO;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.business.common.vo.TB01010SVO.inqueryParameters;

@Mapper
public interface IBIMS103BMapper {
	// 안건등록
	int insert103B(IBIMS103BDTO paramData);

	// 안건삭제
	int deleteDealListInfo(IBIMS103BDTO paramData);

	IBIMS103BVO selectOne103B(IBIMS103BDTO paramData);

	List<IBIMS103BDTO> select103BLst(IBIMS103BDTO paramData);

	int update103B(IBIMS103BDTO paramData);

	List<IBIMS103BVO> getDealList(IBIMS103BVO dealInfo);

	int updateLastYn(IBIMS103BDTO temp);

	List<IBIMS103BVO> checkDealSearch(TB04020SVO dealInfo);

	int updatePrgSttsDcd(List<Map<String, Object>> paramData);

	TB06010SVO selectTB06010SVO(TB06010SVO searchParam);

	TB05040SVO getDealDetail(IBIMS103BDTO paramData);

	// IBIMS103B 안건정보 복사
	IBIMS103BDTO copyDeal103B(IBIMS103BDTO paramData);
	
	List<IBIMS103BVO> selectCnfStts(IBIMS103BVO param);

	List<IBIMS103BVO> selectCnfRslt(IBIMS103BVO param);
	
	List<IBIMS103BVO> selectSttsInvsAstsBfSgnf(IBIMS103BVO param);
	
	List<IBIMS103BVO> selectSttsInvsAstsAfSgnf(IBIMS103BVO param);
	
	List<Map<String, Object>> getTable5(inqueryParameters param);

}
