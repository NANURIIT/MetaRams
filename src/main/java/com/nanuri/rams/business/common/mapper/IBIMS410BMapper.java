package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS410BDTO;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBIMS410BMapper {

	public int selectAfChkTrsnIBIMS410B(IBIMS410BDTO paramData);
	
	public int selectTrsnCntIBIMS410B(IBIMS410BDTO paramData);
	
	// 딜거래내역 거래일련번호 채번
	public int getTrSn(IBIMS410BDTO paramData);
	
	public int getExTrSn(IBIMS410BDTO paramData);
	
	public int getFeeTrSn(IBIMS410BDTO paramData);

	// 딜거래내역 SELECT
	public List<IBIMS410BVO> getDlTrList(IBIMS410BDTO paramData);

	public List<IBIMS410BVO> selectFeeIntTrList(IBIMS410BDTO paramData);

	public IBIMS410BDTO selectlastIBIMS410B(IBIMS410BDTO paramData);
	
	public List<IBIMS410BVO> getDlTrHistoryList(IBIMS410BVO paramData);

	// 딜거래내역 INSERT
	public int saveDlTrList(IBIMS410BDTO param);

	// 딜거래내역 DELETE
	public int cancelDlTrList(IBIMS410BDTO param);

	// 딜거래내역 UPDATE
	public int updateDlTrList(IBIMS410BDTO param);
	
	public int updateChgSttsCd410B(IBIMS410BDTO param);


	// 자금품의결재
	public List<IBIMS410BVO> get07120sList(IBIMS410BVO param);
	
}
