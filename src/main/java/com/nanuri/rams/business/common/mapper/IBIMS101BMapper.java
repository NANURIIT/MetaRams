package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface IBIMS101BMapper {

	// DEAL(사업)명세조회
	public List<IBIMS101BVO> ibSpecSearch(IBIMS101BDTO dealInfo);

	// 딜리스트 조회 팝업
	public List<IBIMS101BVO> getBscDealInfo(IBIMS101BDTO dealInfo);

	// 딜 상세정보 조회
	public IBIMS101BVO getBscDealDetail(IBIMS101BDTO dealInfo);

	// 일련번호 채번
	public String selectSn();

	// 딜번호 채번
	public String selectDealNoFormat(IBIMS101BDTO dealInfo);

	// 최종여부 수정
	public int updateLastYn(String dealNo);

	// 딜 정보 등록
	public int saveDeal(IBIMS101BDTO dealInfo);

	// 딜 목록조회
	public List<IBIMS101BVO> selectLstTB03021P(IBIMS101BVO dealDto);
	
	// 딜 변경이력 sn 조회 
	public List<IBIMS101BVO> selectLstDealSn(IBIMS101BVO dealDto);

	//워크플로우 종목정보 조회
	public List<IBIMS101BVO> getWorkflowInfoList(IBIMS101BVO param);

	//사업정보관리 기본항목 조회
	public IBIMS101BVO getBusiBssInfo101B(String dealNo);


}
