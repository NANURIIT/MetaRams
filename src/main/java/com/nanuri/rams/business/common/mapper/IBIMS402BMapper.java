package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS401BDTO;
import com.nanuri.rams.business.common.dto.IBIMS402BDTO;
import com.nanuri.rams.business.common.vo.IBIMS402BVO;
import com.nanuri.rams.business.common.vo.IBIMS402HVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface IBIMS402BMapper {

	// 실행일련번호 채번
	public long getExcSn(String prdtCd);

	// INSERT / UPDATE 여부 검증
	public String chkExcInfo(String prdtCd);

	// 기업여신실행정보 조회
	public List<IBIMS402BVO> getEprzCrdlExcInfo(String prdtCd);

	// 기업여신실행정보 INSERT Auto Key
	public int saveExcInfo(IBIMS402BDTO param);

	// 기업여신실행정보 UPDATE
	public int uptExcInfo(IBIMS402BDTO param);

	// 상환대상내역 조회
	public List<IBIMS402BVO> getRdmpList(IBIMS402BDTO paramData);

	public List<IBIMS402BVO> getRdmpDetail(String prdtCd);

	// 최종/다음상환일자 조회
	public IBIMS402BVO getNxtRdmpDt(IBIMS402BVO paramData);

	// 딜실행기본조회
	public IBIMS402BVO selectOneIBIMS402B(IBIMS402BVO paramData);
	
	// 대출계좌
	public List<IBIMS402BVO> getloanInfo(String paramData);
	// 수익증권
	public List<IBIMS402BVO> getFundInfo(String paramData);

	// 기업여신실행정보 INSERT No Key
	public int saveExcInfoNoKey(IBIMS402BDTO param);

	// 여신실행기본수정매매용 UPDATE
	public int uptExcInfoTr(IBIMS402BDTO param);

	public int updateChgSttsCd402B(IBIMS402BVO param);

	public int uptExcIBIMS402B(IBIMS402BDTO param);
	
	public TB06015SVO getDetailInfo(TB06015SVO param);

	//실행순번 SlectBox 세팅
	public List<String> getExcSnTB06015P(String prdtCd);

	// 실행일련번호 조회
	public List<Map<String, Object>> srchExcSn(IBIMS401BDTO input);
}
