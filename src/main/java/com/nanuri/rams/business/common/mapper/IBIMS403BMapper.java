package com.nanuri.rams.business.common.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.rams.business.common.dto.IBIMS403BDTO;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB07050SVO;
import com.nanuri.rams.business.common.vo.TB07090SVO;
import com.nanuri.rams.business.common.vo.TB09070SVO;

@Mapper
public interface IBIMS403BMapper {

	// 실행일련번호 채번
	public long getExcSn(String paramData);

	// 기업여신 상환 스케쥴 생성
	public int saveRdmpInfo(List<IBIMS403BDTO> ibims403BDTOList);

	public List<IBIMS403BDTO> selectIBIMS403BList(IBIMS403BVO paramData);
	
	// 상환대상내역 조회
	public List<IBIMS403BVO> getRdmpList(IBIMS403BDTO paramData);

	// 상환대상상세내역 조회
	public List<IBIMS403BVO> getRdmpDetail(IBIMS403BVO paramData);
	
	public int saveIBIMS403B(IBIMS403BVO paramData);
	// 상환대상상세내역 저장
	public int saveRdpm(List<IBIMS403BVO> paramData);

	//TB06015P 원금상환 계획 정보 조회
	public List<IBIMS403BDTO> getRdmpSchedule(TB06015SVO param);

	//TB06015P 이자상환 계획 정보 조회
	public List<IBIMS403BDTO> getIntrSchedule(TB06015SVO param);

	//TB07050S 실행스케줄 조회
	public List<IBIMS403BDTO> getExcSchedule(TB06015SVO input);

	// 여신스케줄기본 저장
	public int insertCrdlSchBss(IBIMS403BDTO input);

	// 여신스케줄기본 업데이트
	public int updateCrdlSchBss(IBIMS403BDTO input);

	// 원리금 스케줄관리 실행일련번호 조회
    public List<Map<String, Object>> srchExcSn(IBIMS403BDTO input);

	// 원리금 스케줄관리 삭제
	public int deleteCrdlSchBss(IBIMS403BDTO input);

	public int deleteIBIMS403B(IBIMS403BVO input);
	
	// 원리금 스케줄관리 회차 채번
	public String getPaiSchTmrd(IBIMS403BDTO input);

	// 실행스케줄 실행일련번호 채번
	public long getExcSchExcSn(IBIMS403BDTO input);

	//입금내역관리 상환예정내역 조회
	public List<IBIMS403BVO> getRdmpPrarDtls(IBIMS430BVO param);

	//상환대상내역 조회
	public List<TB09070SVO.RdmpTrgtDtlsVO> rdmpTrgtDtlsInq(TB09070SVO param);

	//중도상환 시 스케줄 재생성
	public int rgstNewScdl(IBIMS403BVO param);
}
