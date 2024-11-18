package com.nanuri.rams.business.assessment.tb06.tb06010;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.IBIMS105BDTO;
import com.nanuri.rams.business.common.dto.IBIMS112BDTO;
import com.nanuri.rams.business.common.dto.IBIMS202BDTO;
import com.nanuri.rams.business.common.dto.IBIMS205BDTO;
import com.nanuri.rams.business.common.dto.IBIMS208BDTO;
import com.nanuri.rams.business.common.dto.IBIMS209BDTO;
import com.nanuri.rams.business.common.vo.IBIMS112BVO;
import com.nanuri.rams.business.common.vo.IBIMS201BVO;
import com.nanuri.rams.business.common.vo.IBIMS205BVO;
import com.nanuri.rams.business.common.vo.IBIMS208BVO;
import com.nanuri.rams.business.common.vo.IBIMS209BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO;
import com.nanuri.rams.business.common.vo.IBIMS220BVO2;
import com.nanuri.rams.business.common.vo.TB06010SVO;
import com.nanuri.rams.business.common.vo.TB06013PVO;

@Service
public interface TB06010Service {

	// 대출계약 승인정보관리 조회
	TB06010SVO getCnfrncDealInfo(TB06010SVO searchParam); 

	// 상환구분/금리정보 조회
	IBIMS202BDTO selectIBIMS202BDTOInfo(IBIMS202BDTO param);

	// 상환구분/금리정보 등록
	int registIBIMS202BDTOInfo(IBIMS202BDTO param);
	
	// 종목정보 등록
	int regPrdtCd(IBIMS201BVO param);
	
	// 종목정보 삭제
	int deletePrdtCd(IBIMS201BVO param);

	// 투자심사승인정보 등록
	int regIBIMS208B(IBIMS208BVO param);

	// 투자심사승인정보 조회
	List<IBIMS208BVO> selectIBIMS208B(IBIMS208BVO param);

	// 투자심사승인정보 기본정보 조회
	IBIMS112BVO getAppvCndt(IBIMS112BDTO param);

	// 투자심사승인조건 연결
	int connectIBIMS209B(IBIMS209BVO param);

	IBIMS208BDTO getIBIMS208BDTOInfo(IBIMS209BDTO param);

	List<TB06013PVO> getIBIMS212BDTOInfo(TB06013PVO param);
	
	List<IBIMS220BVO> getIBIMS220BDTOInfo(IBIMS220BVO param);
	
	int saveIBIMS220BDTOInfo(IBIMS220BVO2 param);
	
	List<IBIMS205BVO> getAssetInfo(String prdtCd);
	
	int registAssetInfo(IBIMS205BDTO assetInfo);
	
	int deleteAssetInfo(IBIMS205BDTO ibims205bDTO);
	
	// 오늘의 할일 insert
	int insert100BInfo();
	
}
