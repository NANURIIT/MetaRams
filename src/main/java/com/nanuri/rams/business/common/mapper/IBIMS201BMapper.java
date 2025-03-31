package com.nanuri.rams.business.common.mapper;

import java.util.List;

import com.nanuri.rams.business.common.vo.TB06040SVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;
import com.nanuri.rams.business.common.vo.TB07160SVO;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nanuri.rams.business.common.dto.IBIMS201BDTO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.RAA02BVO.TB06010SVO2;
import com.nanuri.rams.business.common.vo.TB06010SVO;

@Mapper
public interface IBIMS201BMapper {

	public List<IBIMS201BDTO> selectIBIMS201B(IBIMS201BDTO searchParam);
	
	public List<IBIMS201BVO> selectPopIBIMS201B(IBIMS201BDTO searchParam);
	
	public TB06010SVO2 selectOneIBIMS201B(TB06010SVO2 searchParam);
	
	public IBIMS201BVO selectOnlyOneIBIMS201B(String prdtCd);
    
	public int updateIBIMS201BDTO(IBIMS201BVO param);
	
	// 종목정보 등록
	public int regPrdtCd(IBIMS201BVO param);

	// 상품코드 채번
	public String getPrdtCdSq(@Param("pageDcd") String pageDcd);

	// 사업명세조회
	public List<IBIMS201BVO> checkDealSearch(IBIMS201BDTO assignInfo);	

	public List<IBIMS201BVO> selectDealExposure(IBIMS201BDTO assignInfo);	
	
	// 대출계약 승인정보관리 조회
	public TB06010SVO selectTB06010SVO(TB06010SVO searchParam);

	public int deletePrdtCd(IBIMS201BVO param);

	TB06040SVO searchIBInfo(String prdtCd);

	public TB07150SVO getCndChngBfInf(String prdtCd);

	public TB07160SVO getTrrcInf(String prdtCd);

	/* TB07150S 조건변경 */
	public int getIBIMS201BSN(IBIMS201BVO param);
	public int setLastYnN(IBIMS201BVO param);
	public int cndChng201B(IBIMS201BVO param);

	/**
	 * 진행상태변경
	 */
	public int sttsUpdate(IBIMS201BDTO param);

}
