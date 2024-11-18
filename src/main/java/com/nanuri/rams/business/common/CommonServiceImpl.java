package com.nanuri.rams.business.common;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS003BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.dto.IBIMS100BDTO;
import com.nanuri.rams.business.common.dto.IBIMS114BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.dto.IBIMS993BDTO;
import com.nanuri.rams.business.common.dto.RAA02BDTO;
import com.nanuri.rams.business.common.dto.RAA20BDTO;
import com.nanuri.rams.business.common.dto.RAA98ADTO;
import com.nanuri.rams.business.common.dto.RAB98BDTO;
import com.nanuri.rams.business.common.vo.RAA20BVO;
import com.nanuri.rams.com.code.AthCd;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {
	
	// 히스토리등록 관련
	private final RAA02BMapper raa02bMapper;
	private final RAA02HMapper raa02hMapper;
	
	// 공통코드정보
	private final RAA91BMapper raa91bMapper;
	
	// 공통코드정보
	private final IBIMS002BMapper ibims002bMapper;
	
	// 메뉴 정보
	private final IBIMS005BMapper ibims005BMapper;
	
	// 파일첨부정보
	private final RAA20BMapper raa20bMapper;
	
	// 직원정보
	private final IBIMS003BMapper ibims003bMapper;
	
	// 부서정보
	private final RAA98AMapper raa98aMapper;
	
	// 법인정보
	private final IBIMS114BMapper ibims114bMapper;
	
	// 메뉴리스트
	private final IBIMS006BMapper ibims006BMapper;

	// 금리정보
	private final RAB98BMapper rab98bMapper;
	
	// 오늘의할일
	private final IBIMS100BMapper ibims100BMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	private CommonService commonService;

	private final IBIMS992BMapper ibims992bMapper;

	private final IBIMS993BMapper ibims993bMapper;

	private final IBIMS007BMapper ibims007bMapper;
	
	/**
	 * 셀렉트박스 코드, 밸류 취득
	 */
	@Override
	public List<Map<String, Object>> getSelectBox(List<String> code) {
		return ibims002bMapper.getSelectBoxList(code);
	}
	
	/**
	 * Top 메뉴 타이틀
	 * @param menuId
	 * @return
	 */
	@Override
	public IBIMS005BVO.TitleVo getTitle(String menuId) {
		return ibims005BMapper.getTitle(menuId);
	}
	
	/**
	 * 담당직원 - 로그인유저정보
	 */
	@Override
	public Map<String, Object> getUserAuth() {
		Map<String, Object> user = new HashMap<String, Object>();
		user.put("eno"   , facade.getDetails().getEno());
		user.put("empNm" , facade.getDetails().getEmpNm());
		user.put("dprtCd", facade.getDetails().getDprtCd());
		user.put("dprtNm", facade.getDetails().getDprtNm());
		user.put("HdqtCd", facade.getDetails().getBdCd());
		user.put("HdqtNm", facade.getDetails().getBdNm());
		user.put("rghtCd", facade.getDetails().getRghtCd());
		user.put("pstn", facade.getDetails().getOpstDcd());
		user.put("athCd", facade.getDetails().getRghtCd());

		return user;
	}
	
	/**
	 * 직원검색
	 */
	@Override
	public List<IBIMS003BDTO> findEmpList(IBIMS003BDTO param) {
		
		return ibims003bMapper.findEmpList(param);
	}
	
	/**
	 * 부서검색
	 */
	@Override
	public List<RAA98ADTO> findDprtList(RAA98ADTO raa98aDto) {
		
		List<RAA98ADTO> raa98aList = raa98aMapper.findDprtList(raa98aDto);
		
		return raa98aList;
	}
		
	/**
	 * 첨부파일 정보 저장
	 * @param RAA20BDTO
	 */
	@Override
	public void registFileInfo(RAA20BDTO dto) {
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		
		raa20bMapper.insertFileInfo(dto);
	}
	
	/**
	 * 첨부파일 정보 저장
	 * @param CommonFileDto
	 */
	// @Override
	// public void registFileInfo(CommonFileDTO commonDto){
	// 	commonDto.setHndlDprtCd(facade.getDetails().getDprtCd());
	// 	commonDto.setHndlPEno(facade.getDetails().getEno());
	// }

	/**
	 * 첨부파일 정보 삭제
	 * @param RAA20BDTO
	 */
	@Override
	public void deleteFileInfo(RAA20BDTO dto) {
		dto.setHndlDprtCd(facade.getDetails().getDprtCd());
		dto.setHndlPEno(facade.getDetails().getEno());
		
		raa20bMapper.updateFileInfo(dto);
	}
	
	/**
	 * 첨부파일 목록 조회
	 * @param RAA20BDTO
	 * @return List<RAA20BDTO>
	 */
	@Override
	public List<RAA20BDTO> getListFileInfo(RAA20BVO vo){
		List<RAA20BDTO> list = raa20bMapper.selectFileList(vo);
		
		return list;
	}
	
	
	// 히스토리 테이블 데이터 생성
	@Override
	public int registHistoy(Map<String, Object> dealInfoMap) {

		String ibDealNo = dealInfoMap.get("ibDealNo").toString();
		String riskInspctCcd = dealInfoMap.get("riskInspctCcd").toString();
		String lstCCaseCcd = dealInfoMap.get("lstCCaseCcd").toString();

		// 1. RAA02HDTO를 set 하여 insert 한다.
		RAA02BDTO raa02bDTO = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		return raa02hMapper.insertDealInfo(raa02bDTO);
	}

	// 법인 검색
	@Override
	public List<IBIMS114BDTO> findEntList(IBIMS114BDTO param) {
		return ibims114bMapper.findEntList(param);
	}

	@Override
	public List<Map<String, Object>> getMenuList(AthCd rghtCd) {
		return ibims006BMapper.getMenuList(rghtCd);
	}
	
	@Override
	public List<Map<String, Object>> getMenuListM(AthCd rghtCd) {
		return ibims006BMapper.getMenuListM(rghtCd);
	}

	// 금리정보
	@Override
	public List<RAB98BDTO> getBitrKind() {
		return rab98bMapper.getBitrKind();
	}

	/**
	 * 금융기관정보
	 */
	@Override
	public List<IBIMS992BDTO> getFnltList(IBIMS992BDTO param) {
		
		return ibims992bMapper.getFnltList(param);
		
	}

	/**
	 * 펀드정보
	 */
	@Override
	public List<IBIMS993BDTO> getFndList(IBIMS993BDTO param) {
		
		return ibims993bMapper.getFndList(param);
		
	}
		
	
	// 오늘의 할 일 등록
	@Override
	public int makeToDoList(IBIMS100BDTO paramData){
		// 파라미터 셋팅
		paramData.setEmpno(facade.getDetails().getEno());
		paramData.setRgstEmpno(facade.getDetails().getEno());
		paramData.setPrcsEmpno(facade.getDetails().getEno());
		paramData.setHndEmpno(facade.getDetails().getEno());

		return ibims100BMapper.insertIBIMS100BInfo(paramData);
	}
	
	/**
	 * deal 심사진행상태변경
	 * 
	 * RAA02BDTO / ibDealNo, riskInspctCcd, lstCCaseCcd의
	 * 심사진행상태코드 inspctPrgrsStCd 를 변경한다.
	 * 
	 * @param RAA02BDTO
	 *        String ibDealNo 
	 *        String riskInspctCcd
	 *        String lstCCaseCcd
	 *        String inspctPrgrsStCd
	 */
	@Override
	public int updateInspctPrgrsStCd(RAA02BDTO paramData) {
		
		String ibDealNo = paramData.getIbDealNo();
		String riskInspctCcd = paramData.getRiskInspctCcd();
		String lstCCaseCcd = paramData.getLstCCaseCcd();
		
		RAA02BDTO dealInfo = raa02bMapper.copyDealInfO(ibDealNo, riskInspctCcd, lstCCaseCcd);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		Calendar c1 = Calendar.getInstance();
		String strToday = sdf.format(c1.getTime());
		
		dealInfo.setUptPEno(facade.getDetails().getEno());
		dealInfo.setUptDt(strToday.substring(0, 8));
		
		raa02bMapper.updateDealInfo(dealInfo);
		
		Map<String, Object> dealInfoMap = new HashMap<String, Object>();
		dealInfoMap.put("ibDealNo", ibDealNo);
		dealInfoMap.put("riskInspctCcd", riskInspctCcd);
		dealInfoMap.put("lstCCaseCcd", lstCCaseCcd);

		return commonService.registHistoy(dealInfoMap);
	}
	
	/**
	 * 셀렉트박스 코드, 밸류 취득
	 */
	@Override
	public List<Map<String, Object>> getSelectBox2(String cmnsCdGrp) {
		return ibims002bMapper.getSelectBox2(cmnsCdGrp);
	}

	// 공통코드
	@Override
	public List<Map<String, Object>> getSelectBoxList(String codeList) {
		
		String[] arrParamData = codeList.split("/");

		if (arrParamData.length > 0) {
			List<String> listParam = new ArrayList<String>();

			for (int i = 0; arrParamData.length > i; i++) {
				listParam.add(arrParamData[i]);
			}

			return ibims002bMapper.getSelectBoxList(listParam);
		} else {
			return null;
		}
		
	}

	// 권한확인
	@Override
	public String chkAthCd(IBIMS007BVO param){
		return ibims007bMapper.chkAthCd(param);
	};

}
