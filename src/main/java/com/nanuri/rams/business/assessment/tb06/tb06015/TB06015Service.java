package com.nanuri.rams.business.assessment.tb06.tb06015;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.TB06015PVO;
import com.nanuri.rams.business.common.vo.TB06015SVO;
import com.nanuri.rams.business.common.vo.TB06015OVO;

@Service
public interface TB06015Service {


	//List<TB06015OVO> getIntrCalcSimulation(TB06015PVO param);
	
	TB06015SVO setIntrCalcSimulation(TB06015PVO param);

	//엑셀 업로드 검증
	public String excelVrfi(TB06015PVO param);


	//기본정보 및 금리정보 조회
	public List<TB06015SVO> getDetailInfo(TB06015SVO param);

	//실행순번 SlectBox 세팅
	public List<String> getExcSn(String prdtCd);
	
	
}
