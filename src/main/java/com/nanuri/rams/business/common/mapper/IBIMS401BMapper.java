package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.vo.IBIMS401BVO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.TB07070SVO;
import com.nanuri.rams.business.common.vo.TB07150SVO;

@Mapper
public interface IBIMS401BMapper {

	// 기업여신정보 검증
	public String chkIBIMS401BInfo(String prdtCd);

	public List<IBIMS410BVO> selectRvseTrInq(TB07070SVO param);
	
	public IBIMS401BVO getIBIMS401BBaseInfo(IBIMS401BDTO param);
	
	// 기업여신정보 조회(401B)
	public IBIMS401BVO getIBIMS401BInfo(IBIMS401BDTO param);

	public IBIMS401BVO getCndChngLdgInf(TB07150SVO param);
	
	// 기업여신정보 조회(201B JOIN)
	public IBIMS401BVO srchCrdlLdg(IBIMS401BDTO input);

	// 기업여신정보 등록(IBIMS401B)
	public int saveIBIMS401BInfo(IBIMS401BDTO param);
	
	public int updateIBIMS401B(IBIMS401BDTO param);
	
	// 기업여신정보 해지정보등록(IBIMS401B)
	public int updateCclcInfo(IBIMS401BDTO param);

	// 기업여신원장정보 조회
	public IBIMS401BVO selectCrdlLdg(IBIMS401BDTO param);

	// 기업여신약정금액 조회
	public String getEprzCrdlCtrcAmt(String param);

	// 약정기본 저장
	public int savePrnaRdmpSch(IBIMS401BDTO input);

	//조건변경
	public int cndChng(IBIMS401BVO param);

}
