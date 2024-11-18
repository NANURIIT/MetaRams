package com.nanuri.rams.business.common.mapper;

import com.nanuri.rams.business.common.dto.IBIMS101BDTO;
import com.nanuri.rams.business.common.dto.TB03020DTO;
import com.nanuri.rams.business.common.vo.IBIMS101BVO;
import com.nanuri.rams.business.common.vo.TB03020SVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RAC02BMapper {

	// 딜관리번호 채번
	public int selDealMngNo();

	// 딜 상세정보 조회
	public TB03020SVO getBscDealDetail(String ibDealNo);

	// 딜정보 저장
	public int saveDeal(TB03020DTO dealInfo);

	// 딜정보 삭제
	public int deleteDeal(String selectedDeal);

	// 결재요청
	public int reqApproveDeal(String mngDealNo);

	// 결재승인
	public int cnfmDeal(String dealMngNo);

	// 반송
	public int rejtDeal(String mngDealNo);

}
